const BASE_URL = process.env.PUBLIC_URL || '';

export const getPublicUrl = (url: string) => `${BASE_URL}${url.replace(/^\/+/, '')}`;
