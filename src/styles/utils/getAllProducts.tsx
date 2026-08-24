import products from '../../../public/api/products.json';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { ProductDetails } from '../../types/productDetails';

const mapDetailsProduct = (product: ProductDetails) => ({
  id: product.id,
  category: product.category,
  itemId: product.id,
  name: product.name,

  fullPrice: product.priceRegular,
  price: product.priceDiscount,

  image: product.images[0],

  screen: product.screen,
  capacity: product.capacity,
  ram: product.ram,
});

export const allProducts = [
  ...products,
  ...phones.map(mapDetailsProduct),
  ...tablets.map(mapDetailsProduct),
  ...accessories.map(mapDetailsProduct),
];
