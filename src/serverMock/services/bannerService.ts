/* eslint-disable no-console */
import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import { BannerData } from '@server/types';

async function getBanners(): Promise<BannerData[]> {
  return (await apiFetch(ApiEndpoint.BANNERS)) as BannerData[];
}

export { getBanners };
