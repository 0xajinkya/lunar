export const config = {
    env: process.env.ENV,
    port: process.env.PORT || 3000,
    storage: {
        key: process.env.STORAGE_KEY!,
        region: process.env.STORAGE_REGION!,
        secret: process.env.STORAGE_SECRET!,
        bucket: process.env.STORAGE_BUCKET!,
        host: process.env.STORAGE_HOST!,
    },
    turso: {
        authToken: process.env.TURSO_AUTH_TOKEN!,
        url: process.env.TURSO_DATABASE_URL!,
    }
}