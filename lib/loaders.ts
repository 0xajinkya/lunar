import type { Application } from "express"
import { Database } from "./database";
import { ExpressLoader } from "./express/loader";

type TypeLoadProps = {
    app: Application;
}

const LoadAll = async({
    app
}: TypeLoadProps) => {
    await Database.Loader();
    ExpressLoader.Load({ app });
};

export const Loaders = {
    LoadAll
};