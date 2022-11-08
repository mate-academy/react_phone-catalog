import { useLocalStorage } from '../helpers/useLocalStorage';
import { Product } from '../types/Product';
import { ProductCard } from './ProductCard';

type Props = {
  products: Product[],
};

export const ProductList: React.FC<Props> = ({ products }) => {
  const [cartProducts, save] = useLocalStorage<Product[]>('products', []);
  const [favorites, saveFavorite] = useLocalStorage<Product[]>('favorites', []);

  return (
    <div className="productlist">
      {
        products.map(product => (
          <ProductCard
            product={product}
            key={product.id}
            isSlider={false}
            products={cartProducts}
            save={save}
            favorites={favorites}
            saveFavorite={saveFavorite}
          />
        ))
      }
    </div>
  );
};
