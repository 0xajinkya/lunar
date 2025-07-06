import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

const Loader = async () => {
    try {
        const client = new PrismaClient();
        logger.debug("✅ Database connected");
        Database.instance = client;
    } catch (error) {
        logger.error("❌ Database connection error:", error);
    }
};

export const Database = {
    /**
     * Prisma Client instance used for interacting with the application's database.
     *
     * This instance should be used throughout the application for all database operations.
     * It manages connection pooling and provides typed access to your database schema.
     *
     * @constant
     * @type {PrismaClient}
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client
     *
     * @example
     * const users = await prismaInstance.user.findMany();
     */
    instance: null as unknown as PrismaClient,
    /**
     * Initializes and connects the Prisma database client.
     *
     * This function:
     * - Attempts to establish a connection to the database using `prismaInstance.$connect()`.
     * - Logs a success message on successful connection.
     * - Logs an error and forcefully exits the process if the connection fails.
     *
     * This should be called once during application startup to ensure the database is ready.
     *
     * @async
     * @function Loader
     * @returns {Promise<void>} Resolves on successful connection, otherwise exits the process.
     *
     * @throws {Error} Logs and exits the process immediately if the Prisma client fails to connect.
     *
     * @example
     * await Loader(); // Ensures DB is connected before continuing
     */
    Loader
};