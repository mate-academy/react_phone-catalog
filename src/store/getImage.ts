// eslint-disable-next-line max-len
const imageModules = import.meta.glob('/src/assets/img/**/*.{png,jpg,jpeg,webp,gif,svg,ico}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export const getImage = (path: string) => {
  if (!path) {
    return '';
  }

  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  const normalizedPath = path.replace(/^\/+/, '');
  const imageKey = `/src/assets/${normalizedPath}`;
  const bundledImage = imageModules[imageKey];

  if (bundledImage) {
    return bundledImage;
  }

  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};
