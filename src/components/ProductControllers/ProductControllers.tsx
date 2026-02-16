import React from 'react';
import classNames from 'classnames';
import styles from './ProductControllers.module.scss';
import { AppContext } from '../../AppContext';
import { FavouriteActiveButton, FavouriteIcon } from '../../helpers/icons';
import { Product, CartProductType } from '../../typies';

type Props = {
  product: Product | null;
};

export const ProductControllers: React.FC<Props> = ({ product }) => {
  const {
    favouriteProducts,
    setFavouriteProducts,
    cart,
    setCart,
    FAVOURITES_LOCAL_STORAGE_ITEM,
    CART_LOCAL_STORAGE_ITEM,
  } = React.useContext(AppContext);

  const [isFavourite, setIsFavourite] = React.useState(false);
  const [isInCart, setIsInCart] = React.useState(false);

  React.useEffect(() => {
    if (product) {
      setIsFavourite(
        favouriteProducts.some((item: Product) => item.id === product.id),
      );
    }
  }, [favouriteProducts, product]);

  React.useEffect(() => {
    if (product) {
      setIsInCart(cart.some((item: CartProductType) => item.id === product.id));
    }
  }, [cart, product]);

  const addProductToFavourites = React.useCallback(() => {
    const favourites = localStorage.getItem(FAVOURITES_LOCAL_STORAGE_ITEM);

    if (favourites) {
      const parsingFavourites = [...JSON.parse(favourites), product];

      localStorage.setItem(
        FAVOURITES_LOCAL_STORAGE_ITEM,
        JSON.stringify(parsingFavourites),
      );

      setFavouriteProducts(parsingFavourites);
    }
  }, [FAVOURITES_LOCAL_STORAGE_ITEM, product, setFavouriteProducts]);

  const removeProductFromFavourites = React.useCallback(() => {
    const favourites = localStorage.getItem(FAVOURITES_LOCAL_STORAGE_ITEM);

    if (favourites && product) {
      const parsingFavourites = JSON.parse(favourites).filter(
        (item: Product) => item.id !== product.id,
      );

      localStorage.setItem(
        FAVOURITES_LOCAL_STORAGE_ITEM,
        JSON.stringify(parsingFavourites),
      );

      setFavouriteProducts(parsingFavourites);
    }
  }, [FAVOURITES_LOCAL_STORAGE_ITEM, product, setFavouriteProducts]);

  const addProductToCart = React.useCallback(() => {
    const cartStorage = localStorage.getItem(CART_LOCAL_STORAGE_ITEM);

    if (cartStorage && product) {
      const parsingCart = [
        ...JSON.parse(cartStorage),
        { id: product.id, quantity: 1, product },
      ];

      localStorage.setItem(
        CART_LOCAL_STORAGE_ITEM,
        JSON.stringify(parsingCart),
      );

      setCart(parsingCart);
    }
  }, [CART_LOCAL_STORAGE_ITEM, product, setCart]);

  const removeProductFromCart = React.useCallback(() => {
    const cartStorage = localStorage.getItem(CART_LOCAL_STORAGE_ITEM);

    if (cartStorage && product) {
      const parsingCart = JSON.parse(cartStorage).filter(
        (item: CartProductType) => item.id !== product.id,
      );

      localStorage.setItem(
        CART_LOCAL_STORAGE_ITEM,
        JSON.stringify(parsingCart),
      );

      setCart(parsingCart);
    }
  }, [CART_LOCAL_STORAGE_ITEM, product, setCart]);

  const handleFavouriteClick = () => {
    if (isFavourite) {
      removeProductFromFavourites();
    } else {
      addProductToFavourites();
    }
  };

  const handleToCartClick = () => {
    if (isInCart) {
      removeProductFromCart();
    } else {
      addProductToCart();
    }
  };

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={classNames(
          styles.addToCard,
          isInCart ? styles['addToCard--active'] : '',
        )}
        onClick={handleToCartClick}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        className={styles.favourite}
        onClick={handleFavouriteClick}
      >
        {isFavourite ? <FavouriteActiveButton /> : <FavouriteIcon />}
      </button>
    </div>
  );
};
