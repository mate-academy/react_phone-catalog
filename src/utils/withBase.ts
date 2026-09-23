// Normalize the separator: the build script can supply a base without a trailing slash.
export const withBase = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
