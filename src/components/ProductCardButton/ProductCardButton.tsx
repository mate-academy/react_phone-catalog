import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Context } from '../Context';
import { Icon } from '../Icon';
import { useLocalStorage } from '../../utils/useLocalStorage';
import {
  ButtonSizeType,
  TopActionButtonType,
} from '../../types/PageNavLink';
import { Product } from '../../types/Product';
import { IconType } from '../../types/Icon';
import './ProductCardButton.scss';

type Props = {
  product: Product;
  type: TopActionButtonType;
  size: ButtonSizeType;
};

export const ProductCardButton: React.FC<Props> = ({
  product,
  type,
  size,
}) => {
  const {
    cart,
    favorite,
    setCart,
    setFavorite,
  } = useContext(Context);

  const inStorage = (type === 'cart')
    ? cart?.some(item => item.id === product?.id)
    : favorite?.some(item => item.id === product?.id);

  const [isInStorage, setIsInStorage] = useState(inStorage);

  const cartItemIsSelected = (type === 'cart') && isInStorage;
  const favoriteItemIsSelected = (type === 'favorite') && isInStorage;

  const [setFavoritesLocalStorage] = useLocalStorage('favorite', favorite);
  const [setCartLocalStorage] = useLocalStorage('cart', cart);

  const favoriteSelectedClassName = favoriteItemIsSelected
    ? 'icon__favorite--active'
    : '';

  const handleButtonClick = (buttonType: TopActionButtonType) => {
    const storage = (buttonType === 'cart')
      ? cart
      : favorite;

    const setStorage = (buttonType === 'cart')
      ? setCart
      : setFavorite;

    const setItemLocalStorage = (buttonType === 'cart')
      ? setCartLocalStorage
      : setFavoritesLocalStorage;

    if (storage && isInStorage) {
      const productsInStorage = [...storage
        .filter(productItem => productItem.id !== product.id)];

      setItemLocalStorage(productsInStorage);
      setStorage(productsInStorage);
      setIsInStorage(false);
    } else if (!storage?.length) {
      const productsInStorage = [product];

      setItemLocalStorage(productsInStorage);
      setStorage(productsInStorage);
      setIsInStorage(true);
    } else {
      const productsInStorage = [...storage, product];

      setItemLocalStorage(productsInStorage);
      setStorage(productsInStorage);
      setIsInStorage(true);
    }

    setIsInStorage(!isInStorage);
  };

  return (
    <button
      className={classNames(
        `card-buttons__add-${type}`,
        `card-buttons__add-${type}--${size}`,
        {
          'card-buttons__add-cart--selected': cartItemIsSelected,
        },
        {
          'card-buttons__add-favorite--selected': favoriteItemIsSelected,
        },
      )}
      type="button"
      onClick={() => handleButtonClick(type)}
    >
      {(type === 'cart')
        && !cartItemIsSelected
        && ('Add to cart')}

      {(type === 'cart')
        && cartItemIsSelected
        && ('Added to cart')}

      {(type === 'favorite')
        && (
          <Icon
            type={IconType.FAVORITE}
            addClassName={favoriteSelectedClassName}
          />
        )}
    </button>
  );
};
