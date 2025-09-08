import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { actions as likeActions } from '../../features/likedProducts';
import { actions as addToCart } from '../../features/addedToCartProducts';
import { Product } from '../../types/Product';
import { RootState } from '../../app/store';
import './ProductCard.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const likedProducts = useSelector((state: RootState) => state.likedProducts);
  const addedToCartProducts = useSelector(
    (state: RootState) => state.addedToCartProducts,
  );

  const likedProduct = likedProducts.find(
    lProduct => lProduct.itemId === product.itemId,
  );
  const addedToCartProduct = addedToCartProducts.find(
    addedProduct => addedProduct.itemId === product.itemId,
  );

  const handleLikeClick = (like: Product) => {
    if (!likedProduct) {
      dispatch(likeActions.add(like));
    } else {
      dispatch(likeActions.deleteOne(like.itemId));
    }
  };

  const handleAddToCartClick = (productToCart: Product) => {
    if (!addedToCartProduct) {
      dispatch(addToCart.add(productToCart));
    } else {
      dispatch(addToCart.deleteOne(productToCart.itemId));
    }
  };

  return (
    <Link
      to={`/${product.category}/${product.itemId}`}
      className="product-link"
    >
      <div className="productCard">
        <div className="productCard__top">
          <div className="productCard__img">
            <img
              src={product.image}
              alt={product.itemId}
              className="productCard__img--img"
            />
          </div>
          <h3 className="productCard__title">{product.name}</h3>
        </div>
        <div className="productCard__bottom">
          {product.price ? (
            <div className="productCard__sale">
              <p className="productCard__price">{`$${product.price}`}</p>
              <p className="productCard__price productCard__price--discount">
                {`$${product.fullPrice}`}
              </p>
            </div>
          ) : (
            <p className="productCard__price">{`$${product.fullPrice}`}</p>
          )}
          <div className="productCard__divider"></div>
          <div className="productCard__properties">
            <div className="properties__category">
              <p className="properties__category--name">Screen</p>
              <p className="properties__category--value">{product.screen}</p>
            </div>
            <div className="properties__category">
              <p className="properties__category--name">Capacity</p>
              <p className="properties__category--value">{product.capacity}</p>
            </div>
            <div className="properties__category">
              <p className="properties__category--name">RAM</p>
              <p className="properties__category--value">{product.ram}</p>
            </div>
          </div>

          <div className="productCard__buttons">
            <button
              // className='buttons buttons--add-to-cart buttons--add-to-cart-active'
              className={classNames('buttons', 'buttons--add-to-cart', {
                'buttons--add-to-cart--active': addedToCartProduct,
              })}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                handleAddToCartClick(product);
              }}
            >
              {/* Add to cart */}
              {addedToCartProduct ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={classNames('buttons', 'buttons--like', {
                'buttons--like--active': likedProduct,
              })}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                handleLikeClick(product);
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
