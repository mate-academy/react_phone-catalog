import React from 'react';
import './ProductByCard.scss';
import { Product } from '../../types/Product';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/addedToCartProducts';
import { actions as quantityActions } from '../../features/cartQuantities';
import { RootState } from '../../app/store';

type Props = {
  product: Product;
};

export const ProductBuyCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cartQuantities);

  const currentItem = cart.find(item => item.id === product.id);
  const quantity = currentItem ? currentItem.quantity : 1;

  const handleIncrement = () => {
    if (quantity <= 9) {
      dispatch(quantityActions.incrementQuantity(product.id));
    }
  };

  const handleDecrement = () => {
    if (quantity >= 1) {
      dispatch(quantityActions.decrementQuantity(product.id));
    }
  };

  const handleDelete = (productToDelete: Product) => {
    dispatch(actions.deleteOne(productToDelete.itemId));
    dispatch(quantityActions.removeQuantity(productToDelete.id));
  };

  return (
    <div className="productBuyCard">
      <div className="productBuyCard__top-byCard top-buyCard">
        <button
          className="top-buyCard__button-close"
          onClick={() => handleDelete(product)}
        />

        <div className="top-buyCard__image">
          <img
            src={product.image}
            alt={product.name}
            className="top-buyCard__image--img"
          />
        </div>

        <p className="top-buyCard__name">{product.name}</p>
      </div>

      <div className="productBuyCard__bottom-buyCard bottom-buyCard">
        <div className="bottom-buyCard__count-products count-products">
          <button
            className="count-products__button"
            disabled={quantity <= 1}
            onClick={handleDecrement}
          >
            −
          </button>

          <span className="count-products__value">{quantity}</span>

          <button
            className="count-products__button"
            disabled={quantity === 9}
            onClick={handleIncrement}
          >
            +
          </button>
        </div>

        <p className="bottom-buyCard__price-product">{`$${product.price ? product.price * quantity : 0}`}</p>
      </div>
    </div>
  );
};
