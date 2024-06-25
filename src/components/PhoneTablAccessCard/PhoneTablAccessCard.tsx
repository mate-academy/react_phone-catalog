import React, { useEffect, useState } from 'react';
import './PhoneTablAccessCard.scss';
import { TabAccessPhone } from '../../types/tabAccessPhones';
import Favorites from '../../images/homePage/Favorites.svg';
import redHeart from '../../images/homePage/redHeart.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as favActions } from '../../features/favSlice';
import { actions as cartActions } from '../../features/cartSlice';

type Props = {
  product: TabAccessPhone;
  brand?: boolean;
};

export const PhoneTablAccessCard: React.FC<Props> = ({ product, brand }) => {
  const dispatch = useAppDispatch();

  const { favProducts } = useAppSelector(state => state.favourites);
  const { cartProducts } = useAppSelector(state => state.cartItems);

  const [clicked, setClicked] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const favProd = favProducts.find(prod => prod.id === product.id);

    if (favProd) {
      setClicked(true);
    }
  }, [favProducts, product, setClicked]);

  useEffect(() => {
    const cartProd = cartProducts.find(prod => prod === product);

    if (cartProd) {
      setPressed(true);
    }
  }, [cartProducts, product, setPressed]);

  const handleFavClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: TabAccessPhone,
  ) => {
    event.preventDefault();

    if (clicked === false) {
      dispatch(favActions.addProduct(prod));
      setClicked(true);
    }

    if (clicked === true) {
      dispatch(favActions.removeProduct(prod));
      setClicked(false);
    }
  };

  const handleCartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    prod: TabAccessPhone,
  ) => {
    event.preventDefault();

    if (pressed === false) {
      dispatch(cartActions.addProduct(prod));
      setPressed(true);
    }

    if (pressed === true) {
      dispatch(cartActions.removeProduct(prod));
      setPressed(false);
    }
  };

  console.log(cartProducts);

  return (
    <div className="card" data-cy="cardsContainer">
      <div className="card__url">
        <img
          src={`https://hanna-balabukha.github.io/react_phone-catalog/${product.images[0]}`}
          alt={product.category}
          className="card__img"
        />
      </div>
      <div className="card__details">
        <div className="card__header">
          <div className="card__name">{product.name}</div>
          <div className="card__price">
            {brand ? (
              <div
                className="card__price__no-discount 
                card__price__no-discount--brand"
              >
                ${product.priceRegular}
              </div>
            ) : (
              <>
                <div className="card__price__discount">
                  ${product.priceDiscount}
                </div>
                <div
                  className="card__price__no-discount 
                  card__price__no-discount--hot"
                >
                  ${product.priceRegular}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="card__line"></div>
        <div className="card__discription">
          <div className="card__center">
            <div className="card__screen-name">Screen</div>
            <div className="card__screen">{product.screen}</div>
          </div>
          <div className="card__center">
            <div className="card__capacity-name">Capacity</div>
            <div className="card__capacity">{product.capacity}</div>
          </div>
          <div className="card__center">
            <div className="card__ram-name">RAM</div>
            <div className="card__ram">{product.ram}</div>
          </div>
        </div>
        <div className="card__buttons">
          <button
            className="card__buttons__add"
            style={
              pressed
                ? { color: '#27AE60', backgroundColor: '#fff' }
                : { color: '#fff', backgroundColor: '#313237' }
            }
            onClick={event => handleCartClick(event, product)}
          >
            {pressed ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className="card__buttons__favorite"
            style={
              clicked
                ? { border: '1px solid #E2E6E9' }
                : { border: '1px solid #B4BDC3' }
            }
            onClick={event => handleFavClick(event, product)}
          >
            <img
              src={clicked === true ? redHeart : Favorites}
              alt="favorites"
              className="card__buttons__heart"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
