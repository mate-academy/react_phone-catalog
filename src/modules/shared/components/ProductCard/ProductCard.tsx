import React from 'react';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../../../_services/services';
import { HeartIcon } from '../../../HomePage/constants/icons';
import { ButtonPrimary } from '../../ButtonPrimary';
import { IconButton } from '../IconButton';
import { ProductsWithDetails } from '../../../../_types/products';
import styles from './ProductCard.module.scss';

type Props = {
  product: ProductsWithDetails;
  type: string;
};

const ProductCard: React.FC<Props> = ({ product, type }) => {
  type ProductKeys = 'screen' | 'capacity' | 'ram';
  const specKeys: ProductKeys[] = ['screen', 'capacity', 'ram'];

  return (
    <div className={styles['product-card']}>
      <Link to="./" className={styles['product-card__image-wrapper']}>
        <img
          alt={`Image of ${product.name}`}
          src={product.image}
          className={styles['product-card__image']}
        />
      </Link>
      <div className={styles['product-card__title']}>{product.name}</div>
      <div className={styles['product-card__prices']}>
        <h3 className={styles['product-card__price']}> &#36;{product.price}</h3>
        {type === 'Hot prices' && (
          <div className={styles['product-card__full-price']}>
            &#36;{product.fullPrice}
          </div>
        )}
      </div>
      <div className={styles['product-card__divider']}></div>
      <ul className={styles['product-card__specs']}>
        {specKeys.map(key => (
          <li key={key} className={styles['product-card__spec']}>
            <div className={styles['product-card__spec-title']}>
              {key === 'ram' ? key.toUpperCase() : capitalizeFirstLetter(key)}
            </div>
            <div className={styles['product-card__spec-value']}>
              {product[key].replace('GB', ' GB')}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles['product-card__buttons']}>
        <ButtonPrimary title={'Add to cart'} />
        <IconButton icon={<HeartIcon />} width={'40'} />
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
