import { json, type Application, type Request } from "express";

type TypeLoadProps = {
    app: Application;
}
const Load = ({
    app
}: TypeLoadProps) => {
    app.enable('trust proxy');
    app.use(
        json({
            limit: '100mb',
            verify: (request: Request, res, buf, encoding) => {
                if (buf && buf.length) {
                    request.rawBody = buf.toString(
                        (encoding as BufferEncoding) || 'utf8'
                    );
                }
            }
        })
    );
};

export const ExpressLoader = {
    Load
}