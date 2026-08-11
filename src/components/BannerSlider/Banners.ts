import PhonesBanner from './banners-img/banner-phones.jpg';
import TabletsBanner from './banners-img/banner-tablets.jpg';
import AccessoriesBanner from './banners-img/banner-accessories.webp';
import PhonesBannerMobile from './banners-img/banner-phone-mobile.png';
import TabletsBannerMobile from './banners-img/banner-tablet-mobile.png';
import AccessoriesBannerMobile from './banners-img/banner-accessories-mobile.png';

export interface Banner {
  id: string;
  titleKey?: string;
  subtitleKey?: string;
  buttonTextKey?: string;
  image: string;
  imageMobile?: string;
  modifier?: string;
  backgroundColor?: string;
  link?: string;
}

export const Banners: Banner[] = [
  {
    id: '1',
    titleKey: 'banner1Title',
    subtitleKey: 'banner1Subtitle',
    buttonTextKey: 'banner1Button',
    image: PhonesBanner,
    imageMobile: PhonesBannerMobile,
    backgroundColor: '#000000',
    modifier: '--1',
    link: '/phones',
  },
  {
    id: '2',
    titleKey: 'banner2Title',
    subtitleKey: 'banner2Subtitle',
    buttonTextKey: 'banner2Button',
    image: TabletsBanner,
    imageMobile: TabletsBannerMobile,
    backgroundColor: '#000000',
    modifier: '--2',
    link: '/tablets',
  },
  {
    id: '3',
    titleKey: 'banner3Title',
    subtitleKey: 'banner3Subtitle',
    buttonTextKey: 'banner3Button',
    image: AccessoriesBanner,
    imageMobile: AccessoriesBannerMobile,
    backgroundColor: '#000000',
    modifier: '--3',
    link: '/accessories',
  },
];
