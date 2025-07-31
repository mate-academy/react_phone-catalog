/* eslint-disable no-console */
import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';

async function getBanners() {
  try {
    const banners = await apiFetch(ApiEndpoint.BANNERS);

    return banners;
  } catch (error) {
    console.warn('Failed to fetch Banners');

    return false;
  }
}

export { getBanners };
