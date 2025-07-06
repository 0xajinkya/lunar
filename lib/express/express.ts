import express, { type IRouterMatcher, type Router } from 'express';
import type { Cookie } from '../utils/errors/helpers/types/common';

type RouteFunction = {
    (path: string, intent: RouterHandler<any, any>): express.RequestHandler;
    (
        path: string,
        middlewares: express.RequestHandler[],
        intent: RouterHandler<any, any>
    ): express.RequestHandler;
};

type IRouter = Omit<
    Router,
    'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'
> & {
    _all: IRouterMatcher<Router>;
    all: RouteFunction;

    _get: IRouterMatcher<Router>;
    get: RouteFunction;

    _post: IRouterMatcher<Router>;
    post: RouteFunction;

    _patch: IRouterMatcher<Router>;
    patch: RouteFunction;

    _put: IRouterMatcher<Router>;
    put: RouteFunction;

    _delete: IRouterMatcher<Router>;
    delete: RouteFunction;

    _options: IRouterMatcher<Router>;
    options: RouteFunction;

    _head: IRouterMatcher<Router>;
    head: RouteFunction;
};

type IRouterSet = {
    status: number;
    headers: Record<string, string>;
    redirect: string | null;
    content: IRouterSetContent;
    cookies: Cookie[];
};

type IRouterSetContent =
    | 'json'
    | 'xml'
    | 'html'
    | { filename: string; type: 'csv' }
    | 'text';

type File = Express.Multer.File & { location: string } & {
    etag: string;
    key: string;
};

export type RouterHandler<
    ResponseBody = any,
    RequestBody = Record<string, any>
> = (context: {
    request: express.Request;
    set: IRouterSet;
    store: Record<string, any>;
    body: RequestBody;
    query: Record<string, string>;
    params: Record<string, string>;
    /** `Multer.File` object populated by `single()` middleware. */
    file?: File;
    /**
     * Array or dictionary of `Multer.File` object populated by `array()`,
     * `fields()`, and `any()` middleware.
     */
    files?: File[];
}) => Promise<ResponseBody>;

const ResponseHandler =
    (intent: RouterHandler) =>
        async (request: express.Request, response: express.Response) => {
            const set: IRouterSet = {
                status: 200,
                headers: {},
                redirect: null,
                content: 'json',
                cookies: []
            };

            const result = await intent({
                request,
                body: request.body,
                set,
                query: request.query as Record<string, string>,
                params: request.params,
                store: response.locals,
                file: request.file as File,
                files: request.files as File[]
            });

            response.status(set.status);

            if (Object.keys(set.headers).length) {
                for (const [key, entry] of Object.entries(set.headers)) {
                    response.setHeader(key, entry);
                }
            }

            if (set.cookies.length) {
                for (const cookie of set.cookies) {
                    response.cookie(cookie.name, cookie.value, cookie.options);
                }
            }

            if (set.redirect) {
                response.redirect(set.redirect);
                return;
            }

            if (set.content === 'json') {
                response.json(result);
                return;
            }

            if (typeof set.content === 'object' && set.content.type === 'csv') {
                response.setHeader('Content-Type', 'text/csv');
                response.setHeader(
                    'Content-Disposition',
                    `attachment; filename=${set.content.filename}.csv`
                );
                response.send(result);
                return;
            }

            response.send(result);
            return;
        };

const RequestHandler =
    (
        router: IRouter,
        method:
            | 'all'
            | 'get'
            | 'post'
            | 'put'
            | 'delete'
            | 'patch'
            | 'options'
            | 'head'
    ) =>
        (
            path: string,
            middlewares: express.RequestHandler[] | RouterHandler,
            intent?: RouterHandler
        ) => {
            if (Array.isArray(middlewares) && intent) {
                const pong = router[`_${method}`](
                    path,
                    ...middlewares,
                    ResponseHandler(intent)
                );
                return pong;
            }

            if (!(Array.isArray(middlewares) || intent)) {
                const pong = router[`_${method}`](path, ResponseHandler(middlewares));
                return pong;
            }

            const pong = router[`_${method}`](
                path,
                ...[
                    Array.isArray(middlewares)
                        ? middlewares
                        : [ResponseHandler(middlewares)]
                ]
            );
            return pong;
        };

export const createRouter = () => {
    const router = express.Router();
    (router as unknown as IRouter)._get = router.get;
    (router as unknown as IRouter).get = RequestHandler(
        router as unknown as IRouter,
        'get'
    );
    (router as unknown as IRouter)._post = router.post;
    (router as unknown as IRouter).post = RequestHandler(
        router as unknown as IRouter,
        'post'
    );
    (router as unknown as IRouter)._patch = router.patch;
    (router as unknown as IRouter).patch = RequestHandler(
        router as unknown as IRouter,
        'patch'
    );
    (router as unknown as IRouter)._put = router.put;
    (router as unknown as IRouter).put = RequestHandler(
        router as unknown as IRouter,
        'put'
    );
    (router as unknown as IRouter)._delete = router.delete;
    (router as unknown as IRouter).delete = RequestHandler(
        router as unknown as IRouter,
        'delete'
    );
    (router as unknown as IRouter)._head = router.head;
    (router as unknown as IRouter).head = RequestHandler(
        router as unknown as IRouter,
        'head'
    );
    (router as unknown as IRouter)._options = router.options;
    (router as unknown as IRouter).options = RequestHandler(
        router as unknown as IRouter,
        'options'
    );

    return router as unknown as IRouter;
};
