import { useLocalStorage } from '../helpers/useLocalStorage';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [cartProducts, save] = useLocalStorage<Product[]>('products', []);
  const [favorites, saveFav] = useLocalStorage<Product[]>('favorites', []);

  return (
    <div className="productlist">
      {
        products.map(item => (
          <ProductCard
            product={item}
            key={item.id}
            isSlider={false}
            products={cartProducts}
            save={save}
            favorites={favorites}
            saveFav={saveFav}
          />
        ))
      }
    </div>
  );
};
