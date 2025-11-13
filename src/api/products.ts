import { Category, Product, ProductDetails } from '../types/Product';
import { getData } from './clients';

export const getAllProducts = () => getData<Product[]>('products');

const getProductsByCategoty = (category: Category) =>
  getData<ProductDetails[]>(category);

export const getProductList = async (category: Category) => {
  const list = await getProductsByCategoty(category);

  return list.map(item => ({
    id: Math.floor(Math.random() * 1000) + 1,
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

/* usage:
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();

        console.log(products); // should now log your data
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);
*/
