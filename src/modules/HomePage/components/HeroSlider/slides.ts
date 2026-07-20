import iphone17Pro from '../../assets/iphone_17pro_hero.png';
import iphone17 from '../../assets/iphone_17_hero.png';
import ipadPro from '../../assets/ipad_pro_hero.png';

export interface Slide {
  id: number;
  heading: string;
  productName: string;
  tagline: string;
  image: string;
  imageAlt: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    heading: 'Now available in our store!',
    productName: 'iPhone 17 Pro.',
    tagline: 'Pro. Beyond.',
    image: iphone17Pro,
    imageAlt: 'iPhone 17 Pro',
  },
  {
    id: 2,
    heading: 'Now available in our store!',
    productName: 'iPhone 17.',
    tagline: 'The future is here.',
    image: iphone17,
    imageAlt: 'iPhone 17',
  },
  {
    id: 3,
    heading: 'Now available in our store!',
    productName: 'iPad Pro.',
    tagline: 'Powerful. Portable. Perfect.',
    image: ipadPro,
    imageAlt: 'iPad Pro',
  },
];
