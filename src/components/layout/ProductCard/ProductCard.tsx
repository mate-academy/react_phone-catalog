import { Button } from '../../ui/Button';
import { ButtonLiked } from '../../ui/ButtonLiked';
import styles from './ProductCard.module.scss';

export const ProductCard = () => {
  return (
    <div className={styles.product}>
      <img src="/img/category-phones.png" alt="" className={styles.img} />
      <h3 className={styles.title}>Apple iPhone 14 Pro 128GB Silver (MQ023)</h3>
      <div className={styles.group}>
        <p className={styles.price}>$999</p>
        <p className={styles.price__discount}>$999</p>
      </div>
      <div className={styles.info}>
        <p className={styles.info__text}>
          Screen
          <span className={styles.info__text_params}>6.1” OLED</span>
        </p>
        <p className={styles.info__text}>
          Screen
          <span className={styles.info__text_params}>6.1” OLED</span>
        </p>
        <p className={styles.info__text}>
          Screen
          <span className={styles.info__text_params}>6.1” OLED</span>
        </p>
      </div>
      <div className={styles.footer}>
        <Button maxWidth="160px">Add to cart</Button>
        <ButtonLiked />
      </div>
    </div>
  );
};
