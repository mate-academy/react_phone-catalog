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
    imgPath: `_new/img/category-${Status.Phones}.png`,
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
    imgPath: `_new/img/category-${Status.Tablets}.png`,
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
    imgPath: `_new/img/category-${Status.Accessories}.png`,
    bgColorImg: '#ac385e',
    width: 'auto',
    height: '300px',
    top: '68px',
    left: '43px',
  },
];
