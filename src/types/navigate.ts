import phonesCategory from '../images/img/category-phones.png';
import tabletsCategory from '../images/img/category-tablets.png';
import accessoriesCategory from '../images/img/category-accessories.png';

export enum Status {
  Home = 'home',
  Phones = 'phones',
  Tablets = 'tablets',
  Accessories = 'accessories',
}

export const navigate = [
  {
    pathTo: '/',
    title: Status.Home,
  },
  {
    pathTo: '/phones',
    title: Status.Phones,
  },
  {
    pathTo: '/tablets',
    title: Status.Tablets,
  },
  {
    pathTo: '/accessories',
    title: Status.Accessories,
  },
];

export const categories = [
  {
    pathTo: '/phones',
    title: `Mobile ${Status.Phones}`,
    subtitle: '95 models',
    imgPath: phonesCategory,
    bgColorImg: '#FCDBC1',
    width: '386px',
    height: '457px',
    top: '8px',
    left: '73px',
  },
  {
    pathTo: '/tablets',
    title: Status.Tablets,
    subtitle: '24 models',
    imgPath: tabletsCategory,
    bgColorImg: '#89939A',
    width: '546px',
    height: '546px',
    top: '20px',
    left: '22px',
  },
  {
    pathTo: '/accessories',
    title: Status.Accessories,
    subtitle: '100 models',
    imgPath: accessoriesCategory,
    bgColorImg: '#ac385e',
    width: 'auto',
    height: '300px',
    top: '68px',
    left: '43px',
  },
];
