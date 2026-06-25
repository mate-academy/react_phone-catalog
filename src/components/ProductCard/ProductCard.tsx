import productCardStyles from './ProductCard.module.scss';
import classNames from 'classnames';
import { AddToCartButton } from '../AddToCartButton';
import { FavoritesButton } from '../FavoritesButton';
import { Product } from '../../shared/types';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard = ({ product, showDiscount }: Props) => {
  const isDiscountPresent = product.fullPrice !== product.price;

  return (
    <div className={productCardStyles.productCard}>
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ scrollToTop: true }}
        className={productCardStyles.productImage}
      >
        <img src={product.image} alt={product.name} />
      </Link>
      <Link
        to={`/${product.category}/${product.itemId}`}
        state={{ scrollToTop: true }}
      >
        <p
          className={classNames('font-body', productCardStyles.title)}
          title={product.name}
        >
          {product.name}
        </p>
      </Link>
      <h3 className={classNames('font-h3', productCardStyles.prices)}>
        <span
          className={productCardStyles.newPrice}
        >{`$${product.price}`}</span>
        {isDiscountPresent && showDiscount && (
          <span className={productCardStyles.oldPrice}>
            {`$${product.fullPrice}`}
          </span>
        )}
      </h3>
      <div className={productCardStyles.horizontalLine} />
      <div className={classNames('font-small', productCardStyles.details)}>
        <p className={productCardStyles.detailsInfo}>
          <span className={productCardStyles.detailTitle}>Screen</span>
          <span className={productCardStyles.detailText}>{product.screen}</span>
        </p>
        <p className={productCardStyles.detailsInfo}>
          <span className={productCardStyles.detailTitle}>Capacity</span>
          <span className={productCardStyles.detailText}>
            {product.capacity}
          </span>
        </p>
        <p className={productCardStyles.detailsInfo}>
          <span className={productCardStyles.detailTitle}>RAM</span>
          <span className={productCardStyles.detailText}>{product.ram}</span>
        </p>
      </div>
      <div className={productCardStyles.buttons}>
        <AddToCartButton product={product} />
        <FavoritesButton product={product} />
      </div>
    </div>
  );
};
