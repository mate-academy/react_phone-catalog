export const LOGO_URL = 'https://image.flaticon.com/icons/svg/495/495946.svg';
export const FAVOURITES_ICON = 'https://image.flaticon.com/icons/svg/710/710147.svg';
export const CART_ICON = 'https://image.flaticon.com/icons/svg/2093/2093844.svg';
// export const MAGNIFIER_ICON = 'https://image.flaticon.com/icons/svg/483/483356.svg';
export const ARROW_UP = 'https://image.flaticon.com/icons/svg/318/318425.svg';
export const OWNER_GIT_HUB = 'https://github.com/vitaliikorol';
export const IMAGES_FOR_SLIDER = [
  'https://www.itelmobile.ro/blog/wp-content/uploads/2020/01/Iphone-11-Pro.png',
  'https://www.extremetech.com/wp-content/uploads/2019/09/Apple-All-Together-640x281.jpg',
  'https://mobile-review.com/review/image/samsung/galaxy-a70/colors.jpg',
  'https://www.androidheadlines.com/wp-content/uploads/2019/11/Huawei-Y6s-and-Mystery-Leak-01-1.jpg',
  'https://i.gadgets360cdn.com/products/large/1553577168_635_samsunggalaxya70_db.jpg',
];

const PRODUCTS_API_URL = 'https://mate-academy.github.io/react_phone-catalog/api/products.json';

export const downloadProducts = () => fetch(PRODUCTS_API_URL).then(response => response.json());
// todo --- resolve problem with lately updated database, async/await
