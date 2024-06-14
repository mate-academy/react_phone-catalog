import React from 'react';
import { Link } from 'react-router-dom';
import { ProductGeneral } from '../../types/ProductGeneral';
import { ShortInfo } from './components/ShortInfo';
import styles from './ProductCard.module.scss';

export type Props = {
  product: ProductGeneral;
  displayFullPrice: boolean;
};

export const ProductCard: React.FC<Props> = React.memo(
  ({ product, displayFullPrice }) => {
    // const navigate = useNavigate();

    const id = product.itemId;
    const img = product.image;

    return (
      <Link
        to={`/${product.category}/${id}`}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        className="link"
      >
        <article className={`${styles.container} border`}>
          <div className={`${styles.img}`}>
            <img
              className={`${styles.img__link} hover--scale`}
              src={img}
              alt={id}
            />
          </div>
          <ShortInfo productId={id} displayFullPrice={displayFullPrice} />
        </article>
      </Link>
    );
  },
);

ProductCard.displayName = 'ProductCard';
