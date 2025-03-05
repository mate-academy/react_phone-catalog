/* eslint-disable max-len */
import React, { useContext } from 'react';
import styles from './ThirdPart.module.scss';
import { HeartLikeSVG } from '../../../../../../../../../../svgs/HeartLikeSVG';
import classNames from 'classnames';
import { FavouritesContext } from '../../../../../../../../../../context/FavouritesContext';
import { Product } from '../../../../../../../../../../types/CategoriesTypes/Product';
import { CartContext } from '../../../../../../../../../../context/CartContext';
import { AddButtonTexts } from '../../../../../../../../../../enums/AddButtonTexts';
import { CartItemType } from '../../../../../../../../../Cart/types/CartItemType';

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
