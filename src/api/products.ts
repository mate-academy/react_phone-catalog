import { Product } from '../types/Product';
import { getData } from './clients';

export const getAllProducts = () => getData<Product[]>('products');

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
