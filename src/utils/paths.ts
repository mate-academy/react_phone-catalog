export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}/${path}`.replace(/\/+/g, '/');
