import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';
import productsData from '../../public/api/products.json';

export const toCartProduct = (product: ProductDetails): Product => {
  const allProducts = productsData as Product[];
  const found = allProducts.find(p => p.itemId === product.id);

  return {
    id: found ? found.id : 0,
    name: product.name,
    price: product.priceDiscount,
    fullPrice: product.priceRegular,
    image: product.images[0],
    category: product.category,
    itemId: product.id,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: found ? found.year : 0,
  };
};

export const getSuggestedProducts = async (
  currentId: string,
): Promise<Product[]> => {
  const allProducts = productsData as Product[];
  const filtered = allProducts.filter(p => p.itemId !== currentId);

  const shuffled = [...filtered];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 10);
};
