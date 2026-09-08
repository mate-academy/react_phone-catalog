import classNames from 'classnames';
import styles from './productCard.module.scss';
import { Product } from '../../types/Product';
import { Link } from 'react-router-dom';
import { CardButton } from '../cardButton';
import { CardPrice } from '../cardPrice';

type Props = {
  product: Product[];
  sliderRef?: React.RefObject<HTMLDivElement>;
  catalog?: true;
};

export const ProductCard: React.FC<Props> = ({
  product,
  sliderRef,
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
          <Link
            to={`/${item.category}/${item.itemId}`}
            className={styles.cardLink}
          >
            <img src={item.image} alt={item.name} className={styles.cardImg} />
            <h3 className={styles.cardTitle}>{item.name}</h3>
          </Link>
          <CardPrice
            fullPrice={item.fullPrice}
            price={item.price}
            year={item.year}
          />
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
          <CardButton id={item.itemId} />
        </div>
      ))}
    </div>
  );
};
