import { APP_BASE_PATH } from 'config/config';

export const resolveImagePath = (imagePath: string) => {
  const base = APP_BASE_PATH.endsWith('/')
    ? APP_BASE_PATH
    : `${APP_BASE_PATH}/`;

  const cleanPath = imagePath.replace(/^\/+/, '').replace(/^(img\/)+/, '');

  return `${base}img/${cleanPath}`;
};
