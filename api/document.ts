import { DocumentController } from "../controllers/document";
import { createRouter } from "../lib/express/express";
import { FileUploadHandlerMiddleware } from "../lib/media/file-upload-handler";

export const DocumentRouter = createRouter();

DocumentRouter.post(
    '/upload',
    [FileUploadHandlerMiddleware('SINGLE')],
    DocumentController.Upload
);

DocumentRouter.get(
    '/status/:job_id',
    DocumentController.Get
)