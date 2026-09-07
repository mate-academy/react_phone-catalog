import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { ProductGeneral } from '../../../types/ProductGeneral';
import styles from './ProductCard.module.scss';
import { Price } from '../Price';
import { ProductButtons } from '../ProductButtons';
import { ProductDetails } from '../ProductDetails';
import { ThemeContext } from '../../../store/ThemeProvider';

type Props = {
  good: ProductGeneral;
  style?: { [key: string]: string };
  otherClassName?: string;
  isFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  good,
  style,
  otherClassName,
  isFullPrice = true,
}) => {
  const {
    itemId,
    name,
    image,
    price,
    screen,
    capacity,
    ram,
    fullPrice,
    category,
  } = good;
  const navigate = useNavigate();
  const { isThemeDark } = useContext(ThemeContext);

  return (
    <div
      className={classNames(styles.card, otherClassName, {
        [styles.card_darkTheme]: isThemeDark,
      })}
      style={style}
      onClick={() => navigate(`/${category}/${itemId}`)}
    >
      <div className={styles.card__content}>
        <img src={image} alt={name} className={styles.card__img} />

        <div
          className={classNames(styles.card__mainInfo, {
            [styles.card__mainInfo_darkTheme]: isThemeDark,
          })}
        >
          <p className={styles.card__title}>{name}</p>

          <Price
            price={price}
            fullPrice={isFullPrice ? fullPrice : undefined}
          />
        </div>

        <ProductDetails
          values={{ screen, capacity, ram }}
          otherClass={styles.card__secondaryInfo}
        />

        <ProductButtons productId={good.itemId} />
      </div>
    </div>
  );
};
