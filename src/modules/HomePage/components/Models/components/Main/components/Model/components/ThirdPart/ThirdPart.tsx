/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useContext } from 'react';

import { CartContext } from '../../../../../../../../../../context/CartContext';
import { FavouritesContext } from '../../../../../../../../../../context/FavouritesContext';
import { AddButtonTexts } from '../../../../../../../../../../enums/AddButtonTexts';
import { HeartLikeSVG } from '../../../../../../../../../../svgs/HeartLikeSVG';
import { Product } from '../../../../../../../../../../types/CategoriesTypes/Product';
import { CartItemType } from '../../../../../../../../../Cart/types/CartItemType';
import styles from './ThirdPart.module.scss';

interface Props {
  itemId: string;
  props: Product;
  isPriceHot: boolean;
}

export const ThirdPart: React.FC<Props> = React.memo(
  ({ itemId, props, isPriceHot }) => {
    const { getIsInFavourites, likeHandler } = useContext(FavouritesContext);
    const { addItem, getIsInCart } = useContext(CartContext);

    const { name, price, fullPrice, image, category } = props;
    const requiredPrice = isPriceHot ? price : fullPrice;
    const cartItemProps: CartItemType = {
      title: name,
      image,
      fullPrice: requiredPrice,
      pricePerItem: requiredPrice,
      category,
      counter: 1,
    };

    const isInCart = getIsInCart(itemId);

    return (
      <div className={styles['third-part']}>
        <button
          className={classNames(styles.add, { [styles['is-added']]: isInCart })}
          onClick={() => addItem(itemId, cartItemProps)}
        >
          {isInCart ? AddButtonTexts.added : AddButtonTexts.add}
        </button>

        <button
          className={classNames(styles.like, {
            [styles['is-liked']]: getIsInFavourites(itemId),
          })}
          style={{ minWidth: '40px' }}
          onClick={() => likeHandler(itemId, props)}
        >
          <HeartLikeSVG />
        </button>
      </div>
    );
  },
);

ThirdPart.displayName = 'ThirdPart';
