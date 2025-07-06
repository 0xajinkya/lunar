import type { Application } from "express"
import { Database } from "./database";
import { ExpressLoader } from "./express/loader";

type TypeLoadAllProps = {
    app: Application;
}

const LoadAll = async ({
    app
}: TypeLoadAllProps) => {
    console.log('Step  2.1')
    await Database.Loader();
    console.log('Step  2.2')
    ExpressLoader.Load({ app });
    console.log('Step  2.3')
};

export const Loaders = {
    /**
     * Loads and initializes all core infrastructure services required before the app starts.
     *
     * Specifically:
     * - Initializes the database connection via `Database.Loader()`.
     * - Sets up Express middleware and configurations via `ExpressLoader.Load()`.
     *
     * This should be called once at server boot time with the Express app instance.
     *
     * @async
     * @function LoadAll
     * @param {Object} props - The configuration object.
     * @param {Application} props.app - The Express application instance to attach middleware to.
     * @returns {Promise<void>} Resolves when all loaders have completed initialization.
     *
     * @throws {Error} If any loader fails during setup.
     *
     * @example
     * await Loaders.LoadAll({ app });
     */
    LoadAll
};