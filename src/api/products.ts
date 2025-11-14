import { Category, Product, ProductDetails } from '../types/Product';
import { getData } from './clients';

export const getAllProducts = () => getData<Product[]>('products');

const getProductsByCategoty = (category: Category) =>
  getData<ProductDetails[]>(category);

export const getProductList = async (category: Category) => {
  const list = await getProductsByCategoty(category);

  return list.map((item, index) => ({
    id: index + 1,
    category,
    itemId: item.id,
    name: item.name,
    fullPrice: item.priceRegular,
    price: item.priceDiscount,
    screen: item.screen,
    capacity: item.capacity,
    color: item.color,
    ram: item.ram,
    year: 0,
    image: item.images[0],
  }));
};
