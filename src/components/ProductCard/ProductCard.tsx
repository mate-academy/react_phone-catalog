import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductGeneral } from '../../types/ProductGeneral';
import { ShortInfo } from './components/ShortInfo';
import styles from './ProductCard.module.scss';

export type Props = {
  product: ProductGeneral;
  displayFullPrice: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, displayFullPrice }) => {
    const navigate = useNavigate();

    const id = product.itemId;
    const img = product.image;

    return (
      <article
        className={`${styles.container} border`}
        onClick={() => {
          navigate(`/${product.category}/${id}`);
          window.scrollTo(0, 0);
        }}
      >
        <div className={`${styles.img}`}>
          <img
            className={`${styles.img__link} hover--scale`}
            src={img}
            alt={id}
          />
        </div>
        <ShortInfo productId={id} displayFullPrice={displayFullPrice} />
      </article>
    );
  },
);

ProductCard.displayName = 'ProductCard';
