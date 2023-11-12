import { Link } from 'react-router-dom';
import React, { useContext, useMemo } from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import { calculateDiscount } from '../../helpers/calculateDiscount';
import { Button } from '../Button/Button';
import { makeCharFormated } from '../../helpers/makeCharacteristicFormated';
import { CartContext } from '../../context/CartContext';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    // age,
    id,
    type,
    imageUrl,
    name,
    // snippet,
    price,
    discount,
    screen,
    capacity,
    ram,
  } = product;
  const { cartItems, setCartItems } = useContext(CartContext);
  const isItemInCart = cartItems.some(item => item.id === id);

  const productPath = `/${type}s/${id}`;

  const priceWithDiscount = useMemo(() => {
    return calculateDiscount(product);
  }, []);

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!product) {
      return;
    }

    const newCartItem = [...cartItems, { id, quantity: 1, product }];

    setCartItems(newCartItem);
    localStorage.setItem('cartItems', JSON.stringify(newCartItem));
  };

  return (
    <div className="ProductCard" data-cy="cardsContainer">
      <div className="ProductCard__image-container">
        <Link to={productPath}>
          <img
            className="ProductCard__image"
            src={imageUrl}
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
          {`$${priceWithDiscount}`}
        </h2>

        {!!discount && (
          <p className="ProductCard__price-discount">
            {`$${price}`}
          </p>
        )}
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
        >
          {isItemInCart
            ? 'Added to cart'
            : 'Add to cart'}
        </Button>

        <Button variant="favourite" />
      </div>
    </div>
  );
};
