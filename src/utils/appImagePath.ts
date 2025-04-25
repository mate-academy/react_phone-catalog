import { APP_BASE_PATH } from 'config/config';

export const resolveImagePath = (imagePath: string) => {
  const base = APP_BASE_PATH || '/';

  const cleanPath = imagePath.replace(/^\/?img\//, '').replace(/^\//, '');

  return `${base}img/${cleanPath}`;
};
