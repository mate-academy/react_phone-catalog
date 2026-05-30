import { Product } from '../../../types/Product';
import { ProductCard } from '../../HomePage/componets/ProductCard';
import styles from './ProductList.module.scss';
import { FavoriteItem } from '../../../contexts/FavoritesContext';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className={styles.productList}>
      {products.map(product => {
        const favoriteProduct: FavoriteItem = {
          ...product,
          favoriteItemId: product.id.toString(),
          showDiscount: false,
        };

        return <ProductCard key={product.id} product={favoriteProduct} />;
      })}
    </div>
  );
};
