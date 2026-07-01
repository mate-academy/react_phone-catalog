export const apiUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path}`.replace(/\/+/g, '/');
