import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './ItemForSlider.scss';
import { UpgradedProduct } from '../../types/UpgradedProduct';
import { StateProduct } from '../../context/ProductContext';
import { favouritesFiledImg, favouritesImg } from '../../utils/indes';

type Props = {
  product: UpgradedProduct;
};

const ItemForSlider: React.FC<Props> = ({ product }) => {
  const { handleAction } = useContext(StateProduct);
  const {
    addedToFavourites,
    addedToCart,
    category,
    itemId,
    name,
    fullPrice,
    price,
    screen,
    capacity,
    ram,
    image,
  } = product;

  const onFavouritesClick = () => {
    handleAction(product, 'favourites');
  };

  const onCartClick = () => {
    handleAction(product, 'cart');
  };

  return (
    <section className="itemForSlider">
      <Link to={`/${category}/${itemId}`} className="itemForSlider__link">
        <img
          src={image}
          alt="ProductImg"
          className="itemForSlider__link-image"
        />
      </Link>
      <div className="itemForSlider__title">{name}</div>
      <div className="itemForSlider__price">
        <h3 className="itemForSlider__price-seil">{`$${price}`}</h3>
        <h3 className="itemForSlider__price-full">{`$${fullPrice}`}</h3>
      </div>
      <p className="itemForSlider__line" />
      <div className="itemForSlider__description">
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Screen</p>
          <p className="itemForSlider__description-value">{screen}</p>
        </div>
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Capacity</p>
          <p className="itemForSlider__description-value">{capacity}</p>
        </div>
        <div className="itemForSlider__description-block">
          <p className="itemForSlider__description-name">Ram</p>
          <p className="itemForSlider__description-value">{ram}</p>
        </div>
        <div className="itemForSlider__buttons">
          <button
            className={classNames('itemForSlider__buttons-cart', {
              'itemForSlider__buttons-cart-isActive': addedToCart,
            })}
            type="button"
            onClick={onCartClick}
          >
            {addedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className="itemForSlider__buttons-favourite"
            type="button"
            onClick={onFavouritesClick}
          >
            <img
              src={addedToFavourites ? favouritesFiledImg : favouritesImg}
              alt="Favourites"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ItemForSlider;
