import { FC } from 'react';
import { Product } from '../../../../types/Product';
import s from './ProductCard.module.scss';
import { Link } from 'react-router-dom';
import { ProductButtons } from '../ProductButtons/ProductButtons';

interface Props {
  product: Product;
  priceMode?: 'discount' | 'full';
}

export const ProductCard: FC<Props> = ({ product, priceMode = 'full' }) => {
  const renderPriceBox = () => {
    if (priceMode === 'discount') {
      return (
        <div className={s.productPrice}>
          <span className={s.newPrice}>${product.price}</span>
          <span className={s.oldPrice}>${product.fullPrice}</span>
        </div>
      );
    }

    return (
      <div className={s.productPrice}>
        <span className={s.newPrice}>${product.fullPrice}</span>
      </div>
    );
  };

  return (
    <article className={s.productCard}>
      <Link
        to={`/product/${product.itemId}`}
        state={{ category: product.category }}
        className={s.productImage}
      >
        <img src={product.image} alt={product.name} />
      </Link>
      <Link
        className={s.productTitle}
        to={`/product/${product.itemId}`}
        state={{ category: product.category }}
      >
        {product.name}
      </Link>
      {renderPriceBox()}
      <div className={s.productInfo}>
        <p className={s.infoItem}>
          <span className={s.greyText}>Screen</span>
          <span>{product.screen}</span>
        </p>
        <p className={s.infoItem}>
          <span className={s.greyText}>Capacity</span>
          <span>{product.capacity}</span>
        </p>
        <p className={s.infoItem}>
          <span className={s.greyText}>RAM</span>
          <span>{product.ram}</span>
        </p>
      </div>
      <ProductButtons itemId={product.itemId} />
    </article>
  );
};
