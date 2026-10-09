import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types/Product';
import { DispatchContext, StateContext } from '../../../context/ItemProvider';

type Props = {
  product?: Product;
  hasDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  hasDiscount = true,
}) => {
  const dispatch = useContext(DispatchContext);
  const { cart, fav } = useContext(StateContext);

  if (!product) {
    return null;
  }

  const isAdded = cart.some(item => item.product.id === product.id);
  const isFav = fav.some(item => item.id === product.id);
  const showFullPrice =
    hasDiscount && product.fullPrice && product.fullPrice > product.price;
  const targetId = product.itemId || product.id;

  return (
    <div className="product__content" key={product.id}>
      <Link to={`/product/${targetId}`} className="product__content--image">
        <img src={product.image} alt={product.name} />
      </Link>
      <Link to={`/product/${targetId}`} className="product__title">
        {product.name}
      </Link>
      <div className="product__price--container">
        <span className="product__price">
          {showFullPrice ? `$${product.price}` : `$${product.fullPrice}`}

          {hasDiscount && (
            <span
              className="product__price--full"
              data-text={product.fullPrice}
            >
              ${product.fullPrice}
            </span>
          )}
        </span>
      </div>
      <div className="product__specs">
        <div className="product__spec-row">
          <span className="product__spec-label">Screen</span>
          <span className="product__spec-value">{product.screen}</span>
        </div>
        <div className="product__spec-row">
          <span className="product__spec-label">Capacity</span>
          <span className="product__spec-value">{product.capacity}</span>
        </div>
        <div className="product__spec-row">
          <span className="product__spec-label">RAM</span>
          <span className="product__spec-value">{product.ram}</span>
        </div>
      </div>
      <div className="product__buttons">
        <button
          type="button"
          className={`product__add ${isAdded ? 'product__add--added' : ''}`}
          disabled={isAdded}
          onClick={() => {
            if (!isAdded) {
              dispatch({ type: 'ADD_ITEM', product });
            }
          }}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          className={`product__fav ${isFav ? 'product__fav--added' : ''}`}
          onClick={() => {
            dispatch({ type: 'TOGGLE_FAV', product });
          }}
        ></button>
      </div>
    </div>
  );
};
