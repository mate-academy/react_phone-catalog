
import React, {  useState, useEffect } from 'react';
import { Product, ProductDetails } from '../../../interfaces';

import './Card.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { addToCart } from '../../../store/cart';
import { addToFavorites, removeOneFromFavorites } from '../../../store/favorites';

export const Card = (
  { product,
    productDetails,
  }: {
    product: Product;
    productDetails: ProductDetails
  }) => {

  const cart = useSelector((state: RootState) => state.cart);
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(favorites
    .filter((item: Product) => item.id === product.id).length > 0);
  const [isInCart, setIsInCart] = useState(cart
    .filter((item: Product) => item.id === product.id).length > 0);
  const [inCartCount, setInCartCount] = useState(cart
    .filter((item: Product) => item.id === product.id).length);

  useEffect(() => {
    setIsFavorite(favorites.filter((item: Product) => item.id === product.id).length > 0)
  }, [favorites])

  useEffect(() => {
    setIsInCart(cart.filter((item: Product) => item.id === product.id).length > 0);
    setInCartCount(cart.filter((item: Product) => item.id === product.id).length)
  }, [cart])

  const handleAddToCartClick = () => {
    dispatch(addToCart(product))
  }

  const handleAddToFavClick = () => {
    if (!isFavorite) {
      dispatch(addToFavorites(product));
    } else {
      dispatch(removeOneFromFavorites(product));
    }
  }

  return (
    <div className="Card">
      <div className="Card__buttons-wrapper">
        <button
          className={isInCart
            ? "Card__add-to-cart Card__add-to-cart--added"
            : "Card__add-to-cart"}
          onClick={handleAddToCartClick}
        >
          {!isInCart
            ? `Add to cart`
            : `${inCartCount}  added to cart`}
        </button>
        <button
          className={isFavorite
            ? "Card__add-to-fav Card__add-to-fav--added"
            : "Card__add-to-fav"}
          onClick={handleAddToFavClick}
        />
      </div>
      <ul className="Card__list">
        <li className="Card__item">
          <span className="Card__spec">Screen</span>
          <span className="Card__value">{product.screen}</span>
        </li>
        <li className="Card__item">
          <span className="Card__spec">Resolution</span>
          <span className="Card__value">
            {productDetails.display.screenResolution}
          </span>
        </li>
        <li className="Card__item">
          <span className="Card__spec">Processor</span>
          <span className="Card__value">
            {productDetails.hardware.cpu}
          </span>
        </li>
        <li className="Card__item">
          <span className="Card__spec">RAM</span>
          <span className="Card__value">{product.ram}</span>
        </li>
      </ul>
    </div>
  )
}
