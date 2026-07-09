import styles from './ProductCard.module.scss';
import { Product } from '../../modules/shared/types/Product';
import { useProductActions } from '../../modules/shared/hooks/useProductActions';
import { ProductImage } from './components/ProductImage';
import { ProductTitle } from './components/ProductTitle';
import { ProductPrice } from './components/ProductPrice';
import { ProductSpecs } from './components/ProductSpecs';
import { ProductActions } from './components/ProductActions';

interface Props {
  product: Product;
  isDiscountHidden?: boolean;
}

export const ProductCard: React.FC<Props> = ({ product, isDiscountHidden }) => {
  const { isInCart, isInFavorites, handleCartAction, handleFavoritesAction } =
    useProductActions(product);

  return (
    <article className={styles.productCard}>
      <ProductImage
        name={product.name}
        category={product.category}
        itemId={product.itemId}
        image={product.image}
      />

      <ProductTitle category={product.category} itemId={product.itemId} name={product.name} />

      <ProductPrice
        price={product.price}
        fullPrice={product.fullPrice}
        isDiscountHidden={isDiscountHidden}
      />

      <ProductSpecs screen={product.screen} capacity={product.capacity} ram={product.ram} />

      <ProductActions
        isInCart={isInCart}
        isInFavorites={isInFavorites}
        handleCartAction={handleCartAction}
        handleFavoritesAction={handleFavoritesAction}
      />
    </article>
  );
};
