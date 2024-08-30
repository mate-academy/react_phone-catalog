import styles from './Card.module.scss';
import { Product } from '../../../type/Product';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { Buttons } from '../Buttons/Buttons';

type CardProps = {
  product: Product;
  category: string;
};

export const Card: React.FC<CardProps> = ({ product, category }) => {
  const { isSunSelected } = useContext(GlobalContext);

  const discription = [
    { title: 'Screen', info: product.screen },
    { title: 'Capacity', info: product.capacity },
    { title: 'RAM', info: product.ram },
  ];

  return (
    <div
      className={classNames(styles.card, {
        [styles.card_dark]: !isSunSelected,
      })}
    >
      <Link to={`/${category}/${product.itemId}`} className={styles.card__link}>
        <div className={styles.card__container}>
          <div className={styles.card__box}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.card__box_image}
            />
          </div>

          <h3
            className={classNames(styles.card__name, {
              [styles.card__name_dark]: !isSunSelected,
            })}
          >
            {product.name}
          </h3>

          <div className={styles.card__cash}>
            <span
              className={classNames(styles.card__cash_price, {
                [styles.card__cash_price_dark]: !isSunSelected,
              })}
            >{`$${product.price}`}</span>
            <span
              className={classNames(styles.card__cash_fullprice, {
                [styles.card__cash_fullprice_dark]: !isSunSelected,
              })}
            >
              {`$${product.fullPrice}`}
            </span>
          </div>

          {discription.map(item => (
            <div key={item.title} className={styles.card__description}>
              <div className={styles.card__description_box}>
                <span
                  className={classNames(styles.card__description_box_title, {
                    [styles.card__description_box_title_dark]: !isSunSelected,
                  })}
                >
                  {item.title}
                </span>
                <span
                  className={classNames(styles.card__description_box_info, {
                    [styles.card__description_box_info_dark]: !isSunSelected,
                  })}
                >
                  {item.info}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Link>

      <Buttons product={product} />
    </div>
  );
};
