import { apiFetch } from '../../helpers';
import { ApiEndpoint } from '../../static';
import { BannerData, ServiceResult, Status } from '../../types';

async function getBanners(): Promise<ServiceResult<BannerData[]>> {
  const banners = await apiFetch(ApiEndpoint.BANNERS);

  if (banners.status === Status.ERROR) {
    return banners;
  }

  return {
    status: Status.SUCCESS,
    data: banners.data,
  };
}

export { getBanners };
