import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import './Cart.scss';
import { Phone } from '../../types';
import { PriceDisplay } from '../PriceDisplay';
import { PhoneSpecs } from '../PhoneSpecs';
import { CartControls } from '../CartControls';

type Props = {
  phone: Phone;
  showDiscount?: boolean;
};

export const Cart: React.FC<Props> = ({ phone, showDiscount = true }) => {
  const { addToCart, removeItem, isInCart } = useCart();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useFavorites();
  const [isAdded, setIsAdded] = useState(isInCart(phone.id));
  const [isLiked, setIsLiked] = useState(isInFavorites(phone.id));
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isAdded) {
      removeItem(phone.id);
    } else {
      addToCart(phone);
    }
    setIsAdded(!isAdded);
  };

  const handleToggleFavorite = () => {
    if (isLiked) {
      removeFromFavorites(phone.id);
    } else {
      addToFavorites(phone);
    }
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsAdded(isInCart(phone.id));
  }, [isInCart, phone.id]);

  useEffect(() => {
    setIsLiked(isInFavorites(phone.id));
  }, [isInFavorites, phone.id]);

  const handleImageClick = () => {
    navigate(`/phones/${phone.id}`);
  };

  return (
    <div className="cart">
      <div className="cart__context">
        <div className="cart__wrapper">
        <img
            className="cart__image"
            src={`${process.env.PUBLIC_URL}/${phone.images[0]}`}
            alt={phone.name}
            onClick={handleImageClick}
          />
          <p className="cart__name">{phone.name}</p>
          <PriceDisplay
            priceRegular={phone.priceRegular}
            priceDiscount={phone.priceDiscount}
            showDiscount={showDiscount}
          />
          <hr />
          <PhoneSpecs
            screen={phone.screen}
            capacity={phone.capacity}
            ram={phone.ram}
            color={phone.color}
          />
          <CartControls
            isAdded={isAdded}
            isLiked={isLiked}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>
    </div>
  );
};

