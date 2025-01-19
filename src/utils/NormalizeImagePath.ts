export const NormalizeImagePath = (path: string) => {
  if (path.startsWith('/')) {
    return path;
  }

  return `/${path}`;
};
