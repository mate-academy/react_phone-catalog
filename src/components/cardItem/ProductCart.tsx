import styles from './ProductCart.module.scss';
import { Product } from '../../types/products';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Buttons } from '../buttons/Buttons';
type Props = {
  products: Product[];
  types?: 'hot' | 'new' | 'grid';
};

export const ProductCart = ({ products, types }: Props) => {
  if (!products) {
    return null;
  }

  return (
    <>
      {products.map(product => (
        <div
          className={classNames(styles.card, {
            [styles['card--grid']]: types === 'grid',
          })}
          key={product.id}
        >
          <Link
            className={styles.card__link}
            to={`/${product.category}/${product.itemId || product.id}`}
          >
            <img className={styles.card__image} src={`./${product.image}`} />
            <h4 className={styles.card__name}>{product.name}</h4>
          </Link>

          {types === 'new' && (
            <span className={styles.card__fullprice}>${product.fullPrice}</span>
          )}
          {types !== 'new' && (
            <>
              <span className={styles.card__fullprice}>${product.price}</span>
              <span className={styles.card__price}>${product.fullPrice}</span>
            </>
          )}
          <div className={styles.card__border}></div>

          <div className={styles.card__info}>
            <div className={styles.card__screen}>
              <span className={styles.card__characteristics}>Screen</span>
              <span className={styles.card__goods}>{product.screen}</span>
            </div>
            <div className={styles.card__screen}>
              <span className={styles.card__characteristics}>Capacity</span>
              <span className={styles.card__goods}>{product.capacity}</span>
            </div>
            <div className={styles.card__screen}>
              <span className={styles.card__characteristics}>RAM</span>
              <span className={styles.card__goods}>{product.ram}</span>
            </div>
          </div>
          <Buttons type={'small'} product={product} />
        </div>
      ))}
    </>
  );
};
