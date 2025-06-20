import styles from './cardItemPhone.module.scss';
import { FaRegHeart } from "react-icons/fa";
import { Product } from '../../types/products';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
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
        <div className={classNames(styles.card, { [styles['card--grid']]: types === 'grid' })}
          key={product.id}>
          <Link to={`/${product.category}/${product.itemId}`}>

          <img className={styles.card__image} src={`./${product.image|| product.images?.[0]}`}/>
          <h4 className={styles.card__name}>{product.name}</h4>
</Link>

          {types === 'new' && (
            <span className={styles.card__fullprice}>${product.fullPrice}</span>
          )}
          {types !== 'new' && (
            <>
              <span className={styles.card__fullprice}>${product.price|product.priceDiscount}</span>
              <span className={styles.card__price}>${product.fullPrice | product.priceRegular}</span>
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
          <div className={styles.card__buttons}>
            <div className={styles.card__addCart}>Add to cart</div>
            <FaRegHeart className={styles.card__favorite} />
          </div>
        </div>
      ))}
    </>
  );
};
