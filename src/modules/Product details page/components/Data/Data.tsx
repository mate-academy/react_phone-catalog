import React, { useEffect, useState } from 'react';
import { PhoneType } from '../../../../types/PhoneType';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addInCart,
  addInFavorites,
  deleteFavorite,
  deleteFromCart,
} from '../../../../features/User/userSlice';

interface Props {
  product: PhoneType | undefined;
  activeImage: number;
  setActiveImage: (index: number) => void;
  choosedColor: string | undefined;
  setChoosedColor: (color: string) => void;
  choosedCapacity: string | undefined;
  setChoosedCapacity: (capacity: string) => void;
}

export const Data: React.FC<Props> = ({
  product,
  activeImage,
  setActiveImage,
  choosedColor,
  setChoosedColor,
  choosedCapacity,
  setChoosedCapacity,
}) => {
  const [isAddedInCart, setIsAddedInCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  const { cart, favorites } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleAddToCart = async () => {
    if (cart.some(item => item.itemId === product?.itemId) && isAddedInCart) {
      dispatch(deleteFromCart(product?.itemId));
      setIsAddedInCart(false);

      return;
    }

    const item: any = {
      ...product,
      image: product?.images[0],
      price: product?.priceDiscount,
      quantity: 1,
    };

    dispatch(addInCart(item));
  };

  const handleFavorited = async () => {
    if (
      favorites.some(item => item.itemId === product?.itemId) &&
      isFavorited
    ) {
      dispatch(deleteFavorite(product?.itemId));
      setIsFavorited(false);

      return;
    }

    dispatch(addInFavorites(product));
  };

  useEffect(() => {
    const isAdded =
      Array.isArray(cart) && cart.some(item => item.itemId === product?.itemId);

    setIsAddedInCart(isAdded);

    const favourites =
      Array.isArray(favorites) &&
      favorites.some(item => item.itemId === product?.itemId);

    setIsFavorited(favourites);
  }, [cart, favorites, product?.id]);

  return (
    <div className="details__data">
      <aside className="details__images">
        <img
          src={product?.images[activeImage]}
          alt=""
          className="details__images--main"
        />
        <div className="details__images--blocks">
          {product?.images.map((image, index) => (
            <div
              key={index}
              className={classNames('details__images--blocks-img', {
                'details__images--blocks-img-active': index === activeImage,
              })}
              onClick={() => setActiveImage(index)}
            >
              <img src={image} alt="" />
            </div>
          ))}
        </div>
      </aside>
      <aside className="details__filters">
        <div className="details__colors">
          <div className="details__colors--text">
            <p className="details__colors--title">Available colors</p>
            <p className="details__colors--id">ID: {id}</p>
          </div>
          <div className="details__filters--colors">
            {product?.colorsAvailable.map((color, index) => (
              <div
                key={index}
                className={classNames('details__filters--colors-block', {
                  'details__filters--colors-block-active':
                    color === choosedColor,
                })}
                onClick={() => setChoosedColor(color)}
              >
                <div className="color" style={{ backgroundColor: color }} />
              </div>
            ))}
          </div>
        </div>
        <div className="details__capacity">
          <p className="details__capacity--title">
            {product?.category === 'accessories'
              ? 'Select size'
              : 'Select capacity'}
          </p>
          <div className="details__capacity--capacities">
            {product?.capacityAvailable.map((capacity, index) => (
              <div
                key={index}
                className={classNames('details__capacity--capacities-block', {
                  'details__capacity--capacities-block-active':
                    capacity === choosedCapacity,
                })}
                onClick={() => setChoosedCapacity(capacity)}
              >
                {capacity}
              </div>
            ))}
          </div>
        </div>
        <div className="details__buy">
          <div className="details__buy--price">
            <span>${product?.priceDiscount}</span>
            <span>${product?.priceRegular}</span>
          </div>
          <div className="details__buy--buttons">
            <button
              type="button"
              className={classNames(
                {
                  'details__buy--buttons-cart': !isAddedInCart,
                },
                {
                  'details__buy--buttons-added': isAddedInCart,
                },
              )}
              onClick={handleAddToCart}
            >
              {isAddedInCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={classNames('details__buy--buttons-favourites', {
                'icon--favourites--button-active': isFavorited,
              })}
              onClick={handleFavorited}
            >
              <img
                src={`nav/favourites${isFavorited ? ' red' : ''}.svg`}
                alt="favourites"
              />
            </button>
          </div>
        </div>
      </aside>
      <div className="details__specs">
        <div className="details__spec">
          <span className="details__spec-label">Screen</span>
          <span className="details__spec-value">{product?.screen}</span>
        </div>
        <div className="details__spec">
          <span className="details__spec-label">Resolution</span>
          <span className="details__spec-value">{product?.resolution}</span>
        </div>
        <div className="details__spec">
          <span className="details__spec-label">Processor</span>
          <span className="details__spec-value">{product?.processor}</span>
        </div>
        <div className="details__spec">
          <span className="details__spec-label">RAM</span>
          <span className="details__spec-value">{product?.ram}</span>
        </div>
      </div>
    </div>
  );
};
