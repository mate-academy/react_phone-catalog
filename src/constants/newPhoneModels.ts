import phones from '../../public/api/phones.json';

export const newPhoneModels = phones.filter(
  phone => phone.name.includes('Apple iPhone 14') && phone.capacity === '128GB',
);

// export const newPhoneModels = [
//   {
//     images: ['/../public/img/phones/apple-iphone-16-pro/00.webp'],
//     name: 'Apple iPhone 16 128GB White Titanium',
//     priceRegular: 1199,
//     screen: "6.9' OLED",
//     capacity: '128GB',
//     ram: '8GB',
//   },
//   {
//     images: ['/../public/img/phones/apple-iphone-16-pro/00.webp'],
//     name: 'Apple iPhone 16 128GB Black Titanium',
//     priceRegular: 999,
//     screen: "6.3' OLED",
//     capacity: '128GB',
//     ram: '8GB',
//   },
//   {
//     images: ['/../public/img/phones/apple-iphone-16/00.webp'],
//     name: 'Apple iPhone 16 128GB Ultramarine',
//     priceRegular: 799,
//     screen: "6.1' OLED",
//     capacity: '128GB',
//     ram: '8GB',
//   },
//   {
//     images: ['img/phones/apple-iphone-16-plus/00.webp'],
//     name: 'Apple iPhone 16 Plus 128GB Pink',
//     priceRegular: 899,
//     screen: "6.7' OLED",
//     capacity: '128GB',
//     ram: '8GB',
//   },
// ];
