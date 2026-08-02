const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const getPublicPath = (path: string) => {
    if (!path) {
        return import.meta.env.BASE_URL;
    }

    if (/^(?:https?:)?\/\//.test(path)) {
        return path;
    }

    const normalizedBase = trimTrailingSlash(import.meta.env.BASE_URL || '/');
    const normalizedPath = path.replace(/^\/+/, '');

    return `${normalizedBase}/${normalizedPath}`;
};
