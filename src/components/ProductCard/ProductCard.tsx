import { Link } from 'react-router-dom';
import React, { useContext, useMemo } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { Button } from '../Button/Button';
import { makeCharFormated } from '../../helpers/makeCharacteristicFormated';
import { CartContext } from '../../context/CartContext';
import { FavouriteContext } from '../../context/FavouriteContext';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    // age,
    itemId,
    // type,
    category,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = product;
  const { cartItems, setCartItems } = useContext(CartContext);
  const { favourites, setFavourites } = useContext(FavouriteContext);
  const isItemInCart = cartItems.some(item => item.itemId === itemId);
  const isItemInFavourites = useMemo(() => {
    return favourites.some(item => item.itemId === itemId);
  }, [favourites]);

  const productPath = `/${category}/${itemId}`;

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (!isItemInCart) {
      const newCartItems = [...cartItems, { itemId, quantity: 1, product }];

      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    } else {
      const newCartItems = [...cartItems].filter(
        item => item.itemId !== itemId,
      );

      setCartItems(newCartItems);
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    }
  };

  const handleToFavourite = () => {
    if (!product) {
      return;
    }

    if (!isItemInFavourites) {
      const newFavourites = [...favourites, product];

      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    } else {
      const newFavourites = [...favourites].filter(
        item => item.itemId !== itemId,
      );

      setFavourites(newFavourites);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    }
  };

  return (
    <div className="ProductCard" data-cy="cardsContainer">
      <div className="ProductCard__image-container">
        <Link to={productPath}>
          <img
            className="ProductCard__image"
            src={image}
            alt={name}
          />
        </Link>
      </div>

      <div className="ProductCard__title">
        <Link to={productPath}>
          {name}
        </Link>
      </div>

      <div className="ProductCard__price">
        <h2 className="ProductCard__price-main">
          {`$${price}`}
        </h2>

        <p className="ProductCard__price-discount">
          {`$${fullPrice}`}
        </p>

      </div>

      <div className="ProductCard__characters">
        <div className="ProductCard__characters__row">
          <p className="ProductCard__characters__row--key">
            Screen
          </p>
          <p className="ProductCard__characters__row--value">
            {makeCharFormated(screen) || '-'}
          </p>
        </div>

        <div className="ProductCard__characters__row">
          <p className="ProductCard__characters__row--key">
            Capacity
          </p>
          <p className="ProductCard__characters__row--value">
            {makeCharFormated(capacity) || '-'}
          </p>
        </div>

        <div className="ProductCard__characters__row">
          <p className="ProductCard__characters__row--key">
            RAM
          </p>
          <p className="ProductCard__characters__row--value">
            {makeCharFormated(ram) || '-'}
          </p>
        </div>
      </div>

      <div className="ProductCard__buttons">
        <Button
          variant="cart"
          card={isItemInCart ? 'added' : undefined}
          onClick={handleAddToCart}
          data-cy="addToFavorite"
        >
          {isItemInCart
            ? 'Added to cart'
            : 'Add to cart'}
        </Button>

        <Button
          variant="favourite"
          favourite={isItemInFavourites ? 'added' : undefined}
          onClick={handleToFavourite}
        />
      </div>
    </div>
  );
};
