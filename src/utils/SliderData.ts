import { LinkPath } from '../types/LinkPath';

import bannerPhones from '../images/banner/banner-phones.jpg';
import bannerTablets from '../images/banner/banner-tablets.jpg';
import bannerAccessories from '../images/banner/banner-accessories.jpg';

export const SliderData = [
  { linkPath: LinkPath.PHONE, imagePath: bannerPhones },
  { linkPath: LinkPath.TABLET, imagePath: bannerTablets },
  { linkPath: LinkPath.ACCESSORY, imagePath: bannerAccessories },
];
