import type express from 'express';
import mime from 'mime-types';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { S3Client } from '@aws-sdk/client-s3';
import { config } from '../utils/env';
import { getId } from '../utils/id';
import { storage } from './s3';
import { AllowedExtension, AllowedMimetypes } from './meta';
import { LunarError } from '../utils/errors';

export const FileUploadHandlerMiddleware =
    (kind: 'SINGLE' | 'MULTIPLE') =>
        async (
            request: express.Request,
            response: express.Response,
            next: express.NextFunction
        ) => {
            const s3 = new S3Client({
                region: config.storage.region,
                credentials: {
                    accessKeyId: config.storage.key.trim(),
                    secretAccessKey: config.storage.secret.trim()
                }
            });
            if (config.storage.bucket) {
                const upload = multer({
                    storage: multerS3({
                        s3: s3 as any,
                        bucket: config.storage.bucket,
                        cacheControl: 'public, max-age=31536000',
                        acl: 'public-read',
                        contentType(_request, file, callback) {
                            callback(null, file.mimetype);
                        },
                        key(_request, file, cb) {
                            const id = getId();
                            const mimetype = mime.lookup(file.originalname);
                            const sanitized_filename = storage.getFilename(file.originalname);

                            let upload_name = `${sanitized_filename}-${id}`;

                            if (mimetype && mime.extension(mimetype)) {
                                upload_name = [upload_name, mime.extension(mimetype)].join('.');
                            };
                            
                            const name = `${upload_name}`;

                            cb(
                                null,
                                config.env === 'development' ? `development/${name}` : name
                            );
                        }
                    }),
                    limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
                    fileFilter(_req, file, cb) {
                        const extension = storage.getExtension(file.originalname);
                        const isValidExtension = AllowedExtension.includes(extension as any);
                        const isValidMime = AllowedMimetypes.includes(file.mimetype as any);

                        if (!isValidExtension || !isValidMime) {
                            return cb(new LunarError.Platform('media.upload.FILE_NOT_ALLOWED'));
                        }
                        cb(null, true);
                    }
                });

                if (kind === 'SINGLE') {
                    return upload.single('media')(request, response, next);
                }
                return upload.array('media')(request, response, next);
            }
        };
