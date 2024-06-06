import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { FavouritesIcon, FavouritesIconRed } from '../../icons';
import { ICartProduct, IProduct } from '../../types';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addProductToCart,
  removeProductFromCart,
  selectCartProducts,
} from '../../features/cartSlices';
import {
  addToFavourites,
  selectFavouritesProduct,
} from '../../features/favouritesSlices';

import './Buttons.scss';

type Props = {
  widthSelectedButton: number;
  heightSelectedButton: number;
  widthAddButton: number;
  heightAddButton: number;
  productID: string;
  product: IProduct | undefined;
};

export const Buttons: FC<Props> = ({
  productID,
  product,
  widthAddButton,
  heightAddButton,
  widthSelectedButton,
  heightSelectedButton,
}) => {
  const cartProducts = useAppSelector(selectCartProducts);
  const favouritesPhones = useAppSelector(selectFavouritesProduct);

  const [hasProductInCart, setHasProductInCart] = useState(false);
  const [hasProductInFavourites, setHasProductInFavourites] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isProductInFavourites = favouritesPhones.some(
      (item) => item.itemId === productID,
    );

    const isProductInCart = cartProducts.some(
      (item) => item.itemId === productID,
    );

    setHasProductInCart(isProductInCart);
    setHasProductInFavourites(isProductInFavourites);
  }, [productID]);

  const handleRemoveProductFromCart = () => {
    setHasProductInCart(false);
    dispatch(removeProductFromCart(productID));
  };

  const handleAddProductToCart = () => {
    if (product) {
      const newProduct: ICartProduct = {
        ...product,
        quantity: 1,
      };

      setHasProductInCart(true);
      dispatch(addProductToCart(newProduct));
    }
  };

  const handleAddToMyFavourites = () => {
    setHasProductInFavourites(prev => !prev);
    if (product) {
      dispatch(addToFavourites(product));
    }
  };

  return (
    <div className="buttons">
      {hasProductInCart ? (
        <button
          type="button"
          style={{ width: widthAddButton, height: heightAddButton }}
          className="buttons__added"
          onClick={handleRemoveProductFromCart}
        >
          Added to cart
        </button>
      ) : (
        <button
          type="button"
          style={{ width: widthAddButton, height: heightAddButton }}
          className="buttons__add"
          onClick={handleAddProductToCart}
        >
          Add to cart
        </button>
      )}
      <button
        type="button"
        style={{ width: widthSelectedButton, height: heightSelectedButton }}
        className={cn('buttons__favorites', {
          selected: hasProductInFavourites,
        })}
        data-cy="addToFavorite"
        onClick={handleAddToMyFavourites}
      >
        {
          hasProductInFavourites
            ? <FavouritesIconRed />
            : <FavouritesIcon />
        }
      </button>
    </div>
  );
};
