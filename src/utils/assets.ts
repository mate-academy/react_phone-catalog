import { getBaseUrl } from './BaseUrl';

export const getAssetUrl = (path?: string) => {
  if (!path) {
    return '';
  }

  if (path.startsWith('http')) {
    return path;
  }

  return `${getBaseUrl()}${path.replace(/^\/+/, '')}`;
};
