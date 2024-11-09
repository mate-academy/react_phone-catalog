import React, { useMemo } from 'react';
import classNames from 'classnames';

import { idGenerator } from '../../../../utils/idGenerator';
import { formatSpecText } from '../../../../utils/formatSpecText';

import styles from './ProductConfig.module.scss';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../hooks/useCart';
import { useFavourite } from '../../../../hooks/useFavourite';
import { Product } from '../../../../types/Product';

interface Props {
  id: string;
  product: Product;
  productList: Product[];
  search: string;
  prevPath: string;
}

export const ProductConfig: React.FC<Props> = ({
  id,
  product,
  productList,
  search,
  prevPath,
}) => {
  const [isAddedToCart, addToCart] = useCart(id, product);
  const [isAddedToFavourite, addToFavourite] = useFavourite(id, product);
  const navigate = useNavigate();

  const {
    colorsAvailable,
    color,
    category,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    capacity,
    ram,
    processor,
    screen,
    resolution,
  } = product;

  const [randomID, formattedScreen, formattedRam] = useMemo(() => {
    return [idGenerator(), formatSpecText(screen), formatSpecText(ram)];
  }, [id]);

  const productsSameModel = productList.filter(
    item => item.namespaceId === product.namespaceId,
  );

  const changeSpec = (
    availableCapacity: string = capacity,
    availableColor: string = color,
  ) => {
    const differentProductId = productsSameModel.find(
      item =>
        item.color === availableColor && item.capacity === availableCapacity,
    )?.id;

    if (!differentProductId) {
      return;
    }

    navigate(`../${differentProductId}`, {
      state: {
        search,
        pathname: prevPath,
        id: differentProductId,
      },
    });
  };

  return (
    <div className={styles.productSpecsContainer}>
      <div className={styles.configContainer}>
        <span className={styles.subTitle}>Available colors</span>
        <div className={styles.configSelection}>
          {colorsAvailable.map(availableColor => (
            <span
              className={classNames(
                styles.color,
                styles[`color${category}-${availableColor}`],
                {
                  [styles.colorIsActive]: availableColor === color,
                },
              )}
              key={availableColor}
              onClick={() => changeSpec(undefined, availableColor)}
            ></span>
          ))}
        </div>
        <span className={styles.randomID}>{randomID}</span>
      </div>
      <div className={styles.configContainer}>
        <span className={styles.subTitle}>Select capacity</span>
        <div className={styles.configSelection}>
          {capacityAvailable.map(availableCapacity => {
            return (
              <span
                className={classNames(styles.capacity, {
                  [styles.capacityIsActive]: availableCapacity === capacity,
                })}
                key={availableCapacity}
                onClick={() => changeSpec(availableCapacity, undefined)}
              >
                {formatSpecText(availableCapacity)}
              </span>
            );
          })}
        </div>
      </div>
      <div className={styles.priceContainer}>
        <p className={styles.price}>{'$' + priceRegular}</p>
        <p className={classNames(styles.price, styles.priceDiscount)}>
          {'$' + priceDiscount}
        </p>
      </div>
      <div className={styles.btnContainer}>
        <button
          className={classNames('btnCart', styles.btnAddToCart, {
            btnCartPressed: isAddedToCart,
          })}
          onClick={addToCart}
          // disabled={isAddedToCart}
        >
          {isAddedToCart ? 'In Cart' : 'Add to Cart'}
        </button>
        <button
          className={classNames('buttonFavourite', 'btnFavourite', {
            btnFavouritePressed: isAddedToFavourite,
          })}
          onClick={addToFavourite}
          aria-label="Add to favourite"
        ></button>
      </div>
      <ul className={styles.productInfo}>
        <li className={styles.productInfoItem}>
          <span>Screen</span>
          <span>{formattedScreen}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>Resolution</span>
          <span>{resolution}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>Processor</span>
          <span>{processor}</span>
        </li>
        <li className={styles.productInfoItem}>
          <span>RAM</span>
          <span>{formattedRam}</span>
        </li>
      </ul>
    </div>
  );
};
