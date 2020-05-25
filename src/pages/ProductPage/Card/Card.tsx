
import React, { useContext, useState, useEffect } from 'react';
import { Product, ProductDetails } from '../../../interfaces';
import {MyContext} from '../../../App';
import './Card.scss';


export const Card = (
  {product,
   productDetails,
  } : {
    product: Product;
    productDetails: ProductDetails
  }) => {


  const { cart, setCart, favorites, setFavorites } = useContext(MyContext);
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
          <span className="Card__value">{productDetails.display.screenResolution}</span>
        </li>
        <li className="Card__item">
          <span className="Card__spec">Processor</span>
          <span className="Card__value">{productDetails.hardware.cpu}</span>
        </li>
        <li className="Card__item">
          <span className="Card__spec">RAM</span>
          <span className="Card__value">{product.ram}</span>
        </li>
      </ul>
    </div>
  )
}


