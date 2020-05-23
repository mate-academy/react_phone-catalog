
import React, { useState, useEffect } from 'react';
import './ProductCard.scss';
import { ProductCardPropsType } from '../../interfaces';



export const ProductCard = ({
  product,
  cart,
  setCart,
  favorites,
  setFavorites }: ProductCardPropsType) => {
  const {
    // age,
    // id,
    // type,
    imageUrl,
    name,
    // snippet,
    price,
    discount,
    screen,
    capacity,
    ram
  } = product;

  const discountPrice = (price - price * discount / 100)


  const [isFavorite, setIsFavorite] = useState(favorites.filter(favorite => favorite.id === product.id).length > 0)
  const [isInCart, setIsInCart] = useState(cart.filter(item => item.id === product.id).length > 0)
  const [inCartCount, setInCartCount] = useState(cart.filter(item => item.id === product.id).length)

  useEffect(() => {
    setIsInCart(cart.filter(item => item.id === product.id).length > 0);
    setInCartCount(cart.filter(item => item.id === product.id).length);

  }, [cart])

  const handleAddToCartClick = () => {
      setCart([
        ...cart,
        product
      ]);



  }


  const handleAddToFavClick = () => {
    if(isFavorite) {
      setFavorites([...favorites].filter(item => item.id !== product.id));
      setIsFavorite(false);
    } else {
      setFavorites([
        ...favorites,
        product
      ]);
      setIsFavorite(true);
    }

  }

  return (
    <div className="ProductCard">
      <img
        className="ProductCard__img"
        src={imageUrl}
        alt={name} />
      <p className="ProductCard__title">{name}</p>

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
          className = {isInCart
            ? "ProductCard__add-to-cart ProductCard__add-to-cart--added"
            : "ProductCard__add-to-cart"}
          onClick={handleAddToCartClick}

        >
          {!isInCart
          ? `Add to cart`
          : `${inCartCount}  added to cart`}
          </button>
        <button
          className={ isFavorite
            ? "ProductCard__add-to-fav ProductCard__add-to-fav--added"
            : "ProductCard__add-to-fav"}
          onClick={handleAddToFavClick}
        />
      </div>

    </div>
  )
}

