declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GO_REST_API_TOKEN: string;
            LOG_LEVEL: string;
            CI: boolean;
        }
    }
}

export {};
