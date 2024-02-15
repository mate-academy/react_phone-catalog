import { request } from '../../../utils/fetchHelper';

export const getBanners = () => {
  return request<string[]>('banners/banners.json');
};
