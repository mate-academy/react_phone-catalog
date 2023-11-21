import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { IconType } from '../../types/Icon';
import { Product } from '../../types/Product';
import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
} from '../../app/hooks';
import {
  addToFavorites,
  removeFromFavorites,
  addToCart,
  removeFromCart,
} from '../../features/favoriteAndCartSlice';
import { CardButtonType } from '../../types/CardButtonType';
import './CardButton.scss';

type Props = {
  typeButton: CardButtonType,
  size: string,
  product: Product | null,
};

export const CardButton: React.FC<Props> = ({
  typeButton,
  size,
  product,
}) => {
  const dispatch = useAppDispatch();
  const {
    favorites,
    cart,
  } = useAppSelector(state => state.favoriteAndCartProducts);

  const [setFavoritesLocalStorage] = useLocalStorage('favorites', favorites);
  const [setCartLocalStorage] = useLocalStorage('cart', cart);

  const inStorage = (typeButton === 'cart')
    ? cart?.some(item => item.id === product?.id)
    : favorites?.some(item => item.id === product?.id);

  const [isInStorage, setIsInStorage] = useState(inStorage);

  const favoriteProductIsSelected = useMemo(() => {
    return (typeButton === 'favorites') && isInStorage;
  }, [typeButton, isInStorage]);

  const cartProductIsSelected = useMemo(() => {
    return (typeButton === 'cart') && isInStorage;
  }, [typeButton, isInStorage]);

  const addFavoriteClass = favoriteProductIsSelected
    ? 'icon__favorite--active'
    : '';

  const cartButtonText = cartProductIsSelected
    ? 'Added to cart'
    : 'Add to cart';

  const handleFavoriteButtonClick = () => {
    if (product) {
      if (!inStorage) {
        const favoriteList = [...favorites, product];

        dispatch(addToFavorites(product));
        setFavoritesLocalStorage(favoriteList);
      } else {
        const updatedFavorites = favorites.filter(
          item => item.id !== product.id,
        );

        dispatch(removeFromFavorites(product.id));
        setFavoritesLocalStorage(updatedFavorites);
      }
    }
  };

  const handleCartButtonClick = () => {
    if (product) {
      if (!inStorage) {
        const addCartProduct = [...cart, product];

        dispatch(addToCart(product));
        setCartLocalStorage(addCartProduct);
      } else {
        const updatedCartList = cart.filter(item => item.id !== product.id);

        dispatch(removeFromCart(product));
        setCartLocalStorage(updatedCartList);
      }
    }
  };

  const handleClickButton = (buttonType: CardButtonType) => {
    if (buttonType === 'favorites') {
      handleFavoriteButtonClick();
    } else {
      handleCartButtonClick();
    }

    setIsInStorage(!isInStorage);
  };

  return (
    <button
      className={classNames(
        `card-button__add-${typeButton}`,
        `card-button__add-${typeButton}--${size}`,
        {
          'card-button__add-favorite--selected': favoriteProductIsSelected,
          'card-button__add-cart--selected': cartProductIsSelected,
        },
      )}
      type="button"
      data-cy="addToFavorite"
      onClick={() => handleClickButton(typeButton)}
    >
      {typeButton === 'cart' && cartButtonText}

      {typeButton === 'favorites' && (
        <Icon
          type={IconType.FAVORITE}
          addClassName={addFavoriteClass}
        />
      )}
    </button>
  );
};
