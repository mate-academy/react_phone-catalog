import React from 'react';
import styles from './ProductCard.module.scss';
import { Product } from '../../utils/Product';
import { useNavigate } from 'react-router-dom';
import { CharacteristicsTable } from '../CharactiristicsTable';
import { Buttons } from '../Buttons';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.product}
      onClick={() => navigate(`/${product.category}/${product.id}`)}
    >
      <div className={styles.product__characteristics}>
        <img
          className={styles.product__image}
          src={product.images[0]}
          alt={product.name}
        />

        <p className={styles.product__description}>{product.name}</p>

        <div className={styles['product__price']}>
          <p
            className={
              styles.product__price + ' ' + styles['product__price--discount']
            }
          >
            ${product.priceDiscount}
          </p>
          <p
            className={
              styles.product__price + ' ' + styles['product__price--regular']
            }
          >
            ${product.priceRegular}
          </p>
        </div>
      </div>

      <CharacteristicsTable
        characteristics={[
          { name: 'Screen', value: product?.screen },
          { name: 'Capacity', value: product?.capacity },
          { name: 'RAM', value: product?.ram },
        ]}
      />

      <Buttons product={product} />
    </div>
  );
};
