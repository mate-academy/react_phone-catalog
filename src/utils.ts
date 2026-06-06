export const getBaseUrl = () => {
  let baseUrl = import.meta.env.BASE_URL;

  if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
  }

  return baseUrl;
};