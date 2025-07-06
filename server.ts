import express from 'express';
import { LunarError } from './lib/utils/errors';
import { logger } from './lib/utils/logger';
import { V1Router } from './routes/v1';
import { Loaders } from './lib/loaders';

export const createServer = async () => {
    const app = express();
    await Loaders.LoadAll({
        app
    })

    app.use('/api', V1Router);

    app.all(/.*/, () => {
        throw new LunarError.NotFound();
    });

    app.use(LunarError.Middleware((error, req, res) => {
        logger.error('Captured Error:', error.message);
    }));

    return app;
}