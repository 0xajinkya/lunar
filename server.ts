import express from 'express';
import { LunarError } from './lib/utils/errors';
import { logger } from './lib/utils/logger';
import { V1Router } from './routes/v1';
import { Loaders } from './lib/loaders';

/**
 * Initializes and configures the Express server.
 *
 * This function:
 * - Instantiates an Express app.
 * - Loads all necessary loaders via `Loaders.LoadAll()` (e.g., middleware, database, etc.).
 * - Registers the versioned API router (`/api` route prefix).
 * - Handles unmatched routes by throwing a `LunarError.NotFound`.
 * - Attaches a global error handler middleware to format and log errors.
 *
 * @async
 * @function createServer
 * @returns {Promise<import('express').Express>} The configured Express application instance.
 *
 * @throws {Error} If loader initialization fails or an unexpected error occurs during setup.
 *
 * @example
 * const app = await createServer();
 * app.listen(3000, () => console.log('Server running on port 3000'));
 */
export const createServer = async() => {
    console.log("Step 1");
    const app = express();
    console.log("Step 2");
    await Loaders.LoadAll({
        app
    })
    console.log("Step 3");
    app.use('/api', V1Router);
    console.log("Step 4");
    app.all(/.*/, () => {
        throw new LunarError.NotFound();
    });
    console.log("Step 5");
    app.use(LunarError.Middleware((error, req, res) => {
        logger.error('Captured Error:', error.message);
    }));
    console.log("Step 6");
    return app;
}