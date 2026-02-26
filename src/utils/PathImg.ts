export const mediaPath = (path: string) =>
  `${window.location.origin}${import.meta.env.BASE_URL}/${path.replace(/^\/+/, '')}`;
