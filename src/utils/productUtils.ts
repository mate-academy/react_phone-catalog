import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

const hashCode = (str: string): number => {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }

  return Math.abs(hash);
};

export const toCartProduct = (product: ProductDetails): Product => ({
  id: hashCode(product.id),
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
  year: 0,
});
export const getSuggestedProducts = async (
  currentId: string,
): Promise<Product[]> => {
  const res = await fetch('/api/products.json');
  const allProducts: Product[] = await res.json();

  const filtered = allProducts.filter(p => p.itemId !== currentId);

  const shuffled = [...filtered];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, 10);
};
