import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useCounter } from '../Context/Context';

import './CardButtons.scss';

type Props = {
  size: string,
  product: Product | undefined,
};

export const CardButtons: React.FC<Props> = ({ size, product }) => {
  const [selectedLike, setSelectedLike] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [newProduct, setNewProduct] = useState<Product | undefined>();

  const context = useCounter();

  const checkActiveFavorites = localStorage.getItem('favorites');
  const checkActiveCart = localStorage.getItem('cart');

  useEffect(() => {
    if (checkActiveFavorites) {
      const qwe = JSON.parse(checkActiveFavorites);
      const activeFavoritesButton = qwe.some((elem: Product) => elem.id === product?.id);

      setSelectedLike(activeFavoritesButton);
    }

    if (checkActiveCart) {
      const checkCart = JSON.parse(checkActiveCart);
      const activeCartButton = checkCart.some((elem: Product) => elem.id === product?.id);

      setAddedToCart(activeCartButton);
    }

    setNewProduct(product);
  }, [product]);

  const addFavorites = () => {
    let favoritesProduct: Product[] = [];

    if (product) {
      const checkFavoritesLocation = localStorage.getItem('favorites');

      if (checkFavoritesLocation !== null) {
        const productFromLocal = JSON.parse(checkFavoritesLocation);

        const findProduct = productFromLocal.some((elem: Product) => elem.id === product.id);

        if (findProduct) {
          const filter = productFromLocal.filter((elem: Product) => elem.id !== product.id);

          if (context) {
            context.counterFavorites(-1);
          }

          favoritesProduct = [...filter];
        } else {
          favoritesProduct = [...productFromLocal, product];

          if (context) {
            context.counterFavorites(1);
          }
        }
      } else {
        favoritesProduct.push(product);
      }
    }

    localStorage.setItem('favorites', JSON.stringify(favoritesProduct));
  };

  const addToCart = () => {
    let addToCartProduct: Product[] = [];

    if (newProduct) {
      newProduct.quantity = 1;
    }

    if (product) {
      const checkCartLocation = localStorage.getItem('cart');

      if (checkCartLocation !== null) {
        const productFromLocal = JSON.parse(checkCartLocation);

        const findProduct = productFromLocal.some((elem: Product) => elem.id === product.id);

        if (findProduct) {
          const filter = productFromLocal.filter((elem: Product) => elem.id !== product.id);

          if (context) {
            context.counterCart(-1);
          }

          addToCartProduct = [...filter];
        } else {
          addToCartProduct = [...productFromLocal, product];
          if (context) {
            context.counterCart(1);
          }
        }
      } else {
        addToCartProduct.push(product);
      }
    }

    localStorage.setItem('cart', JSON.stringify(addToCartProduct));
  };

  return (
    <div className="CardButtons">
      <button
        type="button"
        className={classNames('CardButtons__add-cart', {
          'CardButtons__add-cart--isSmall': size === 'small',
          'CardButtons__add-cart--isBig': size === 'big',
        })}
        onClick={() => {
          addToCart();
          setAddedToCart(!addedToCart);
        }}
      >
        {addedToCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button
        type="button"
        className={classNames('CardButtons__add-like', {
          'CardButtons__add-like--isSmall': size === 'small',
          'CardButtons__add-like--isBig': size === 'big',
        })}
        onClick={() => {
          addFavorites();
          setSelectedLike(!selectedLike);
        }}
      >
        <i
          className={classNames({
            'icon-Favourites-Heart-Like': selectedLike === false,
            'icon-Favourites-Filled-Heart-Like': selectedLike === true,
          })}
        />
      </button>
    </div>
  );
};
