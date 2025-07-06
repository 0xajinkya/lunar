import {
    DeleteObjectCommand,
    GetObjectCommand,
    type GetObjectCommandOutput,
    PutObjectCommand,
    S3Client
} from '@aws-sdk/client-s3';
import mime from 'mime-types';
/* eslint-disable no-param-reassign */
import sanitizeFilename from 'sanitize-filename';
import type { IMediaObject } from './types';
import { MediaKindOfMimetype, type IAllowedMimetype } from './meta';
import { config } from '../utils/env';
import { logger } from '../utils/logger';
import { LunarError } from '../utils/errors';
import { getId } from '../utils/id';

export const storage = {
    instance: new S3Client({
        region: config.storage.region.trim(),
        credentials: {
            accessKeyId: config.storage.key.trim(),
            secretAccessKey: config.storage.secret.trim()
        }
    }),

    getFilename(filename: string): string {
        const extension = this.getExtension(filename);
        return sanitizeFilename(filename.replace(`.${extension}`, ''));
    },

    getExtension(filename: string): string {
        if (!filename) {
            return '';
        }
        const matches = filename.match(/(?:\.([^.]+))?$/g);
        if (!matches) {
            return '';
        }
        return matches[0].substring(1);
    },

    base64MimeType(encoded: string): string | null {
        let result: string | null = null;

        if (typeof encoded !== 'string') {
            return result;
        }

        const mimeVal = encoded.match(/data:([@a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

        if (mimeVal?.length) {
            [, result] = mimeVal;
        }

        return result;
    },

    async findObject(name: string): Promise<GetObjectCommandOutput | null> {
        try {
            const command = new GetObjectCommand({
                Bucket: config.storage.bucket.trim(),
                Key: name
            });

            const data = await this.instance.send(command);
            return data;
        } catch (ex) {
            logger.debug(ex);
        }
        return null;
    },

    async upload({
        body,
        name,
        mimetype,
        expires_in = 2592000
    }: {
        body: Buffer;
        name: string;
        mimetype: string;
        folder?: string | null;
        expires_in?: number;
    }): Promise<{ path: string; location: string }> {
        let path = `${name}`;

        if (config.env === 'development') {
            path = `development/${path}`;
        }

        const command = new PutObjectCommand({
            Body: body,
            Bucket: config.storage.bucket.trim(),
            Key: path,
            ContentEncoding: 'base64',
            ContentType: mimetype,
            CacheControl: `max-age=${expires_in}`,
            ACL: 'public-read',
            Expires: new Date(Date.now() + expires_in * 1000)
        });

        await this.instance.send(command);

        return { path, location: `${config.storage.host.trim()}/${path}` };
    },

    async generate({
        body,
        filename,
        folder
    }: {
        body: Buffer | string;
        filename: string;
        folder: string | null;
    }): Promise<IMediaObject> {
        const id = getId();
        const mimetype = mime.lookup(filename);

        if (!mimetype) {
            /**
             * @todo
             */
            throw new LunarError.Platform('400');
        }

        const sanitizedFilename = this.getFilename(filename);

        let uploadName = `${id}-${sanitizedFilename}`;

        if (mimetype && mime.extension(mimetype)) {
            uploadName = [uploadName, mime.extension(mimetype)].join('.');
        }

        if (typeof body === 'string') {
            const base64 = body.split('base64,').pop();
            if (base64) {
                body = Buffer.from(base64, 'base64');
            } else {
                /**
                 * @todo
                 */
                throw new LunarError.Platform('400');
            }
        }

        const result = await this.upload({
            body,
            folder,
            name: uploadName,
            mimetype: mimetype || ''
        });

        const kind = mimetype
            ? MediaKindOfMimetype[mimetype as IAllowedMimetype] || 'document'
            : 'document';

        return {
            id,
            filename,
            kind,
            mimetype: mimetype || 'application/octet-stream',
            width: null,
            height: null,
            ...result
        };
    },

    async delete(path: string): Promise<boolean> {
        const command = new DeleteObjectCommand({
            Bucket: config.storage.bucket.trim(),
            Key: path
        });

        await this.instance.send(command);

        return true;
    }
};
