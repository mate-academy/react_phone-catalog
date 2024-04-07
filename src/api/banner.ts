import bannerAccessories from '../images/banner-accessories.png';
import bannerPhones from '../images/banner-phones.png';
import bannerTablets from '../images/banner-tablets.png';

export const getBanner = () => {
  return Promise.resolve([bannerAccessories, bannerPhones, bannerTablets]);
};
