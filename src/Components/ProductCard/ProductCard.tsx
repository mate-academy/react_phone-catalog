import React, { useContext } from 'react';
import { ProductGeneral } from '../../types/ProductGeneral';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../store/ProductContext';
import classNames from 'classnames';

type Props = {
  product: ProductGeneral | null;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { addProductToFavourites, inFavourites } = useContext(ProductContext);

  const checkItemInCart = (card: ProductGeneral) => {
    return inFavourites.find(prod => prod === card);
  };

  const checkLikedItem = (card: ProductGeneral) => {
    return inFavourites.find(prod => prod === card);
  };

  return (
    <>
      {product && (
        <div className="product-card">
          <Link to={`./${product.itemId}`} className="product-card__image">
            <img
              className="product-card__image--link"
              src={product.image}
            ></img>
          </Link>
          <Link
            to={`./${product.itemId}`}
            relative={'path'}
            className="product-card__title"
          >
            {product.name}
          </Link>
          <div className="product-card__prices">
            <p className="product-card__prices--low">${product.price}</p>
            <p className="product-card__prices--full">${product.fullPrice}</p>
          </div>

          <div className="product-card__border"></div>
          <div className="product-card__specs">
            <div className="product-card__specs--item">
              <p className="product-card__specs--item_name">Screen</p>
              <p className="product-card__specs--item_description">
                {product.screen}
              </p>
            </div>
            <div className="product-card__specs--item">
              <p className="product-card__specs--item_name">Capacity</p>
              <p className="product-card__specs--item_description">
                {product.capacity}
              </p>
            </div>
            <div className="product-card__specs--item">
              <p className="product-card__specs--item_name">RAM</p>
              <p className="product-card__specs--item_description">
                {product.ram}
              </p>
            </div>
          </div>
          <div className="product-card__buttons">
            <button
              className={classNames('product-card__buttons--add', {
                'product-card__buttons--add--active': checkItemInCart(product),
              })}
            >
              Add to cart
            </button>
            <div
              className="product-card__buttons--wrapper"
              onClick={() => addProductToFavourites(product)}
            >
              <button
                className={classNames('details__button--like__link', {
                  'details__button--like__link__active':
                    checkLikedItem(product),
                })}
              ></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
