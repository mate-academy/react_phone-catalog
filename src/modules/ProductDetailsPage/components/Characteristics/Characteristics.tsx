import React, { useContext } from 'react';
import classNames from 'classnames';

import { ProductDetails } from '../../../../types/ProductDetails';
import { GlobalContext } from '../../../../GlobalContext';
import { addSpaceInText } from '../../../../shared/workWithString';
import { PRODUCT_COLORS } from '../../constants/colors';

import classes from './Characteristics.module.scss';
import { AddButton } from '../../../../components/buttons/AddButton';
import { FavoriteButton } from '../../../../components/buttons/FavoriteButton';
import { Details } from '../Details';

type Props = {
  product: ProductDetails;
  list: ProductDetails[];
  changeItem: (item: ProductDetails) => void;
};

export const Characteristics: React.FC<Props> = ({
  product,
  list,
  changeItem,
}) => {
  const { products } = useContext(GlobalContext);
  const { color, capacity } = product;

  const availableColors = list.map(item => item.color);
  const availableCapacity = list.map(item => item.capacity);

  const handleCangeColor = (itemColor: string) => {
    const newProduct = list.find(
      item => item.color === itemColor && item.capacity === product.capacity,
    );

    if (newProduct) {
      changeItem(newProduct);
    }
  };

  const handleCangeCapacity = (itemCapacity: string) => {
    const newProduct = list.find(
      item => item.capacity === itemCapacity && item.color === product.color,
    );

    if (newProduct) {
      changeItem(newProduct);
    }
  };

  const productId = products
    .findIndex(item => item.itemId === product.id)
    .toString()
    .padStart(6, '0');

  return (
    <section className={classes.Characteristics}>
      <div className={classes.Characteristics__main}>
        <div className={classes.Characteristics__container}>
          <h4>Available colors</h4>
          <div className={classes.Characteristics__wrapper}>
            {product.colorsAvailable.map(item => (
              <button
                key={item}
                type="button"
                className={classNames(classes.Characteristics__color, {
                  [classes['Characteristics__color--active']]: color === item,
                })}
                disabled={!availableColors.includes(item)}
                onClick={() => handleCangeColor(item)}
              >
                <div
                  className={classes['Characteristics__color-item']}
                  style={{ backgroundColor: PRODUCT_COLORS[item] }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={classes.Characteristics__container}>
          <h4>Select capacity</h4>
          <div className={classes.Characteristics__wrapper}>
            {product.capacityAvailable.map(item => (
              <button
                key={item}
                type="button"
                className={classNames(classes.Characteristics__capacity, {
                  [classes['Characteristics__capacity--active']]:
                    capacity === item,
                })}
                disabled={!availableCapacity.includes(item)}
                onClick={() => handleCangeCapacity(item)}
              >
                {addSpaceInText(item)}
              </button>
            ))}
          </div>
        </div>

        <div className={classes.Price}>
          <h2>{`$${product.priceDiscount}`}</h2>
          <div className={classes.Price__regular}>
            {product.priceRegular && <p>{`$${product.priceRegular}`}</p>}
            {product.priceRegular && <p>{`$${product.priceRegular}`}</p>}
          </div>
        </div>
        <div className={classes.Characteristics__buttons}>
          <AddButton id={product.id} bigButton />
          <FavoriteButton id={product.id} bigButton />
        </div>

        <Details product={product} />
      </div>

      <div className={classes.Characteristics__id}>{`ID: ${productId}`}</div>
    </section>
  );
};
