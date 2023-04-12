import { useLocation } from 'react-router-dom';
import { Product } from '../Types/Product';
import { client } from './fetchProd';
import { ProductDetails } from '../Types/ProductDeteils';

// sorting data by the quety
export const querySort = (products: Product[], query: string) => {
  return products.filter(
    (product: Product) => product.name.toLowerCase().includes(
      query.toLowerCase(),
    ),
  );
};

// fetch data from server
export const getProducts = () => {
  return client.get<Product[]>('./new/products.json');
};

// get suggestedProducts `filtering by random`
export const getSuggestedProducts = async () => {
  const productsData = await getProducts();
  const suggestedProducts = [...productsData.sort(() => Math.random() - 0.5)];

  return suggestedProducts;
};

// filtering data by catagoryes [phones, tablets, accessories]
export const getPoductsByCategory = (data: Product[], category: string) => {
  return data.filter((el) => el.category === category);
};

// fetch product by id from servers
export const getProductById = (productId: string | null) => {
  return client.get<ProductDetails>(`./new/products/${productId}.json`);
};

// get path name from location
export const getPathName = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const path = location.pathname.split('/').join(' ');
  const preparetedPath = path.slice(0).split(' ').filter((el) => el !== '');

  if (path.trim() !== '') {
    const PathName = preparetedPath[0][0]
      .toUpperCase() + preparetedPath[0].slice(1);

    return PathName;
  }

  return 'Home';
};
