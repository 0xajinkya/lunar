/**
 * Centralized application configuration object loaded from environment variables.
 *
 * Contains structured values for:
 * - App environment and port
 * - S3-compatible storage credentials and endpoint
 * - Database connection
 * - Trigger.dev secret keys
 *
 * All environment variables must be defined before accessing this config,
 * or the app may crash due to non-null assertions (`!`).
 *
 * @constant
 * @example
 * const bucket = config.storage.bucket;
 * const dbUrl = config.database.url;
 **/

export const config = {
    env: process.env.ENV,
    port: Number(process.env.PORT || 3000),
    storage: {
        key: process.env.STORAGE_KEY!,
        region: process.env.STORAGE_REGION!,
        secret: process.env.STORAGE_SECRET!,
        bucket: process.env.STORAGE_BUCKET!,
        host: process.env.STORAGE_HOST!,
    },
    database: {
        url: process.env.DATABASE_URL!,
    },
    trigger: {
        secret_key: process.env.TRIGGER_SECRET_KEY!,
    },
    google: {
        genai_key: process.env.GOOGLE_GENAI_KEY!
    }
};