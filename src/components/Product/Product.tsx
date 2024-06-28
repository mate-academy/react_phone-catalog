import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Product.scss';
import { UpgradedProduct } from '../../types/UpgradedProduct';
import { StateProduct } from '../../context/ProductContext';
import { favouritesFiledImg, favouritesImg } from '../../utils/indes';

type Props = {
  product: UpgradedProduct;
};

const Product: React.FC<Props> = ({ product }) => {
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
    <section className="product">
      <Link to={`/${category}/${itemId}`} className="product__link">
        <img src={image} alt="ProductImg" className="product__link-image" />
      </Link>
      <div className="product__title">{name}</div>
      <div className="product__price">
        <h3 className="product__price-seil">{`$${price}`}</h3>
        <h3 className="product__price-full">{`$${fullPrice}`}</h3>
      </div>
      <p className="product__line" />
      <div className="product__description">
        <div className="product__description-block">
          <p className="product__description-name">Screen</p>
          <p className="product__description-value">{screen}</p>
        </div>
        <div className="product__description-block">
          <p className="product__description-name">Capacity</p>
          <p className="product__description-value">{capacity}</p>
        </div>
        <div className="product__description-block">
          <p className="product__description-name">Ram</p>
          <p className="product__description-value">{ram}</p>
        </div>
        <div className="product__buttons">
          <button
            className={classNames('product__buttons-cart', {
              'product__buttons-cart-isActive': addedToCart,
            })}
            type="button"
            onClick={onCartClick}
          >
            {addedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <button
            className="product__buttons-favourite"
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

export default Product;
