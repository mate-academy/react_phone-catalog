import data from '../../../public/api/products.json';
import { Product } from '../../modules/shared/types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const NewModels: React.FC = () => {
  const getNewestProducts = (products: Product[]): Product[] => {
    const maxYear = Math.max(...products.map(p => p.year));

    return products.filter(p => p.year === maxYear);
  };

  const newestPhones = getNewestProducts(data).sort(
    (a, b) => b.price - a.price,
  );

  return <ProductsSlider title="Brand new models" products={newestPhones} />;
};
