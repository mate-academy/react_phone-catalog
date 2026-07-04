import styles from './BrandCard.module.scss';
import like from '../../icons/like.svg';
import { useNavigate } from 'react-router-dom';

export function BrandCard() {
  const navigate = useNavigate();

  return (
    <div
      className={styles.brandCard}
      onClick={() => navigate('/Phones/apple-iphone-11-128gb-black')}
    >
      <img src="img/card.png" alt="" className={styles.brandCard__img} />
      <h1 className={styles.brandCard__title}>Brand Name</h1>
      <p className={styles.brandCard__price}>99$</p>
      <hr className={styles.brandCard__divider} />
      <div className={styles.brandCard__params}>
        <div className={styles.brandCard__params__item}>
          <p className={styles.brandCard__params__title}>Screen</p>
          <p className={styles.brandCard__params__value}>6.5</p>
        </div>
        <div className={styles.brandCard__params__item}>
          <p className={styles.brandCard__params__title}>Screen</p>
          <p className={styles.brandCard__params__value}>6.5</p>
        </div>
      </div>
      <div className={styles.brandCard__buttons}>
        <button className={styles.brandCard__buttons__cart}>Add to Cart</button>
        <button className={styles.brandCard__buttons__fav}>
          <img src={like} alt="" />
        </button>
      </div>
    </div>
  );
}
