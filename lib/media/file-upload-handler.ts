import type express from 'express';
import mime from 'mime-types';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { S3Client } from '@aws-sdk/client-s3';
import { config } from '../utils/env';
import { getId } from '../utils/id';
import { Storage } from './s3';
import { AllowedExtension, AllowedMimetypes } from './meta';
import { LunarError } from '../utils/errors';

/**
 * Middleware for handling file uploads via Multer and S3.
 *
 * This middleware:
 * - Uses `multer` and `multer-s3` to stream files directly to an S3 bucket.
 * - Filters files by allowed extensions and MIME types.
 * - Limits file size to 5MB.
 * - Generates unique filenames using a sanitized original name and a random ID.
 * - Supports both single and multiple file uploads.
 *
 * The uploaded file(s) will be available on the `request.file` or `request.files` object,
 * depending on the `kind` parameter.
 *
 * @function FileUploadHandlerMiddleware
 * @param {'SINGLE' | 'MULTIPLE'} kind - Determines whether to expect a single file or multiple files.
 * @returns {express.RequestHandler} An Express middleware that handles the file upload and forwards the request.
 *
 * @throws {LunarError.Platform} If the file extension or MIME type is not allowed.
 * @throws {Error} If AWS credentials or bucket configuration are invalid.
 *
 * @example
 * // For single file upload:
 * app.post('/upload', FileUploadHandlerMiddleware('SINGLE'), handlerFn);
 *
 * @example
 * // For multiple file upload:
 * app.post('/upload', FileUploadHandlerMiddleware('MULTIPLE'), handlerFn);
 */
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
                            const sanitized_filename = Storage.getFilename(file.originalname);

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
                    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
                    fileFilter(_req, file, cb) {
                        const extension = Storage.getExtension(file.originalname);
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
