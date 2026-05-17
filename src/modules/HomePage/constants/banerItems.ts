import Baner1 from '/img/banner-phones.png';
import Baner2 from '/img/banner-accessories.png';
import Baner3 from '/img/banner-tablets.png';
import { BanerItemsType } from '../types/BanerItemsType';

export const banerItems: BanerItemsType[] = [
  { id: 1, item: Baner1, to: 'phones' },
  { id: 2, item: Baner2, to: 'accessories' },
  { id: 3, item: Baner3, to: 'tablets' },
];
