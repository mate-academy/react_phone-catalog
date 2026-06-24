export const asset = (path: string) =>
  `${window.location.origin}${import.meta.env.BASE_URL}/${path.replace(/^\/+/, '')}`;
