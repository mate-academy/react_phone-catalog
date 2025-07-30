import classNames from 'classnames';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { Icon } from '../icons';
import { icons } from '../../constants/icons';

type Props = {
  product: Product[];
  sliderRef?: React.RefObject<HTMLDivElement>;
  withDiscount?: boolean;
  catalog?: true;
};

export const ProductCard: React.FC<Props> = ({
  product,
  sliderRef,
  withDiscount = false,
  catalog = false,
}) => {
  return (
    <div
      className={catalog ? styles['cards--catalog'] : styles.cards}
      ref={sliderRef}
    >
      {product.map(item => (
        <div
          className={classNames(styles.card, {
            [styles['card--catalog']]: catalog,
          })}
          key={item.id}
        >
          <img src={item.image} alt={item.name} className={styles.cardImg} />
          <h3 className={styles.cardTitle}>{item.name}</h3>
          {!withDiscount ? (
            <div className={styles.cardPrice}>
              <span>$</span>
              {item.fullPrice}
            </div>
          ) : (
            <div className={styles.cardPrice}>
              <span>$</span>
              {item.price}
              <span> </span>
              <span className={styles.cardFullPrice}>${item.fullPrice}</span>
            </div>
          )}
          <div className={styles.cardContent}>
            <div className={styles.cardDescription}>
              <span className={styles.descriptionName}>Screen</span>
              <span className={styles.descriptionValue}>{item.screen}</span>
            </div>
            <div className={styles.cardDescription}>
              <span className={styles.descriptionName}>Copacity</span>
              <span className={styles.descriptionValue}>{item.capacity}</span>
            </div>
            <div className={styles.cardDescription}>
              <span className={styles.descriptionName}>RAM</span>
              <span className={styles.descriptionValue}>{item.ram}</span>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <button className={styles.cardBtn}>Add to card</button>
            <div
              className={classNames(
                styles['button-img'],
                styles['button-img--width'],
              )}
            >
              <Icon icon={icons.favorites} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
