//import { formError } from '../helpers';
import { BannerData, ProcessingResult } from '../types';
import { banners } from '../static';
//const FAIL_RATE = 0.05;

function getBanners(): ProcessingResult<BannerData[]> {
  /*  if (failCheck <= FAIL_RATE) {
  const failCheck = Math.random();

    return formError(500, 'Failed to load banners');
  } */
  return {
    ok: true,
    data: banners,
  };
}

export { getBanners };
