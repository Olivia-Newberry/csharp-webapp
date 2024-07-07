/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_API_URL: string;
    readonly REACT_CHAT_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
