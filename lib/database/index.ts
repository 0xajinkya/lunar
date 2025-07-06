import { logger } from "../utils/logger";
import { prismaInstance } from "./instance";

const Loader = async () => {
    try {
        await prismaInstance.$connect();
        logger.debug("✅ Database connected");
    } catch (error) {
        logger.error("❌ Database connection error:", error);
        process.exit(1); // Hard exit on failure
    }
};

export const Database = {
    instance: prismaInstance,
    Loader
};