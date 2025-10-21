/* eslint-disable no-console */
import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import { BannerData, Status, ValidResponse } from '@server/types';

async function getBanners(): Promise<ValidResponse> {
  const banners = (await apiFetch(ApiEndpoint.BANNERS)) as BannerData[];

  return {
    status: Status.SUCCESS,
    data: banners,
  };
}

export { getBanners };
