/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** '1' in the single-file preview build, which routes on the hash. */
  readonly VITE_HASH_ROUTER?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
