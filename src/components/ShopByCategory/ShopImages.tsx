import phones from '../../img/ShopbyCategory/phones.png';
import tablets from '../../img/ShopbyCategory/tablets.png';
import accessories from '../../img/ShopbyCategory/accessories.png';
import { ShopByCategoryImg } from '../../types/ShopByCategoryImg';

export const ShopImages: ShopByCategoryImg[] = [
  {
    id: 1,
    title: 'phones',
    name: 'Mobile phones',
    url: phones,
    backColor: '#fcdbc1',
    type: 'phone',
  },
  {
    id: 2,
    title: 'tablets',
    name: 'Tablets',
    url: tablets,
    backColor: '#8d8d92',
    type: 'tablet',
  },
  {
    id: 3,
    title: 'accessories',
    name: 'Accessories',
    url: accessories,
    backColor: '#973d5f',
    type: 'accessory',
  },
];
