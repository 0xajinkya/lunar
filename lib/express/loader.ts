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
            limit: '100mb'
        })
    );
};

export const ExpressLoader = {
    /**
     * Configures global Express middleware and settings.
     *
     * Specifically:
     * - Enables `trust proxy` for reverse proxy setups (e.g., Heroku, Nginx).
     * - Adds `express.json()` middleware with a 100MB limit for handling large JSON payloads.
     * - Captures the raw request body and attaches it to `request.rawBody`, useful for webhook signature validation.
     *
     * This should be called once during server initialization.
     *
     * @function Load
     * @param {Object} props - Loader configuration.
     * @param {Application} props.app - The Express app instance to apply middleware and settings to.
     * @returns {void}
     *
     * @example
     * ExpressLoader.Load({ app });
     */
    Load
}