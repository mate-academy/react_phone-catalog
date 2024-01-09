import { LinkPath } from '../types/LinkPath';

import bannerPhones from '../images/banner/banner-phones.png';
import bannerTablets from '../images/banner/banner-tablets.png';
import bannerAccessories from '../images/banner/banner-accessories.png';

export const SliderData = [
  { linkPath: LinkPath.PHONE, imagePath: bannerPhones },
  { linkPath: LinkPath.TABLET, imagePath: bannerTablets },
  { linkPath: LinkPath.ACCESSORY, imagePath: bannerAccessories },
];
