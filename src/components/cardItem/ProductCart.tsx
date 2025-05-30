import styles from './cardItemPhone.module.scss';
import { Product } from '../../types/products';
type Props = {
  products: Product[];
  types?: 'hot' | 'new';
}

export const ProductCart = ({products, types}:Props) => {

 if (!products) {
    return null;
  }

  return (<>{products.map(product => (<div className={styles.card} key={product.id}>
    <img className={styles.card__image}
     src= {`/${product.image}`}></img>
    <h4 className={styles.card__name}>{ product.name}</h4>

   { types ==='new' && <span className={styles.card__fullprice}>${product.fullPrice}</span>}
    {types === 'hot' &&
    <><span className={styles.card__fullprice}>${product.price}</span>
      <span className={styles.card__price}>${product.fullPrice}</span></>}
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
            <span className={styles.card__characteristics}>RAM</span><span
            className={styles.card__goods}>{product.ram}</span>

          </div>

        </div>
        <div className={styles.card__buttons}>
          <div className={styles.card__addCart}>Add to cart</div>
          <div className={styles.card__favorite}></div>
        </div>
      </div>))}</>)
}
