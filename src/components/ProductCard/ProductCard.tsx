
import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.scss';
import {  Product } from '../../interfaces';

import {MyContext} from '../../App'



export const ProductCard = ({
  product,
}: {product:Product}) => {

  const {
    imageUrl,
    name,
    price,
    discount,
    screen,
    capacity,
    ram
  } = product;

  const {cart, setCart, favorites, setFavorites} = useContext(MyContext);

  const discountPrice = (price - price * discount / 100)

  const [isFavorite, setIsFavorite] = useState(favorites.filter((item: Product) => item.id === product.id).length > 0);

  const [isInCart, setIsInCart] = useState(cart.filter((item: Product) => item.id === product.id).length > 0);

  const [inCartCount, setInCartCount] = useState(cart.filter((item: Product) => item.id === product.id).length);


  useEffect(() => {
    setIsFavorite(favorites.filter((item: Product) => item.id === product.id).length > 0)
  }, [favorites])

  useEffect(() => {
    setIsInCart(cart.filter((item: Product) => item.id === product.id).length > 0);
    setInCartCount(cart.filter((item: Product) => item.id === product.id).length)
  }, [cart])


  const handleAddToCartClick = () => {
    setCart(
      [
        ...cart,
        product
      ]
    );
  }

  const handleAddToFavClick = () => {
    if (!isFavorite) {
      setFavorites([...favorites, product]);
    } else {
      setFavorites([...favorites].filter(item => item.id !== product.id));
    }
  }


  let base;

  switch (product.type) {
    case 'phone':
      base = '/phones/';
      break;
    case 'tablet':
      base = '/tablets/';
      break;
    default:
      base = 'accessorise'
  }

  return (
    <div className="ProductCard">
      <img
        className="ProductCard__img"
        src={imageUrl}
        alt={name} />
      <Link
        to={base + product.id}
        className="ProductCard__title">
        {name}
      </Link>

      {discount > 0
        ?
        <div className="ProductCard__price-wrapper">
          <span className="ProductCard__price">{"$" + discountPrice}</span>
          <span className="ProductCard__price ProductCard__price--old">{"$" + price}</span>
        </div>
        :
        <div className="ProductCard__price-wrapper">
          <span className="ProductCard__price">{"$" + discountPrice}</span>
        </div>
      }

      <div className="ProductCard__description">
        <span className="ProductCard__feature">
          <span className="ProductCard__feature--title ProductCard__feature">Screen</span>
          <span className="ProductCard__feature--value ProductCard__feature">{screen}</span>
        </span>
        <span className="ProductCard__feature">
          <span className="ProductCard__feature--title ProductCard__feature">Capacity</span>
          <span className="ProductCard__feature--value ProductCard__feature">{capacity}</span>
        </span >
        <span className="ProductCard__feature">
          <span className="ProductCard__feature--title ProductCard__feature">RAM</span>
          <span className="ProductCard__feature--value ProductCard__feature">{ram}</span>
        </span>
      </div>
      <div className="ProductCard__buttons-wrapper">
        <button
          className={isInCart
            ? "ProductCard__add-to-cart ProductCard__add-to-cart--added"
            : "ProductCard__add-to-cart"}
          onClick={handleAddToCartClick}

        >
          {!isInCart
            ? `Add to cart`
            : `${inCartCount}  added to cart`}
        </button>
        <button
          className={isFavorite
            ? "ProductCard__add-to-fav ProductCard__add-to-fav--added"
            : "ProductCard__add-to-fav"}
          onClick={handleAddToFavClick}
        />
      </div>

    </div>
  )
}

