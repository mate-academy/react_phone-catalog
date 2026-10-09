import { useContext } from 'react';
import { CartItemType, DispatchContext } from '../../context/ItemProvider';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../../utils/productUtils';

interface Props {
  item: CartItemType;
}

export const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useContext(DispatchContext);
  const { product, quantity } = item;
  const { price } = getProductDetails(item.product);
  const total = price * quantity;
  const targetId = product.itemId || product.id;

  return (
    <div className="cart__item">
      <button
        type="button"
        className="cart__remove"
        onClick={() => dispatch({ type: 'REMOVE_ITEM', id: product.id })}
      ></button>
      <Link to={`/product/${targetId}`} className="cart__img">
        <img src={product.image} alt={product.name} />
      </Link>
      <Link to={`/product/${targetId}`} className="cart__text">
        {product.name}
      </Link>
      <div className="buttons cart__buttons">
        <button
          className={`buttons__minus ${quantity > 1 ? 'buttons__minus--active' : ''}`}
          disabled={quantity === 1}
          onClick={() => dispatch({ type: 'DECREMENT', id: product.id })}
        ></button>
        <span className="buttons__count">{quantity}</span>
        <button
          className="buttons__plus"
          onClick={() => dispatch({ type: 'INCREMENT', id: product.id })}
        ></button>
      </div>
      <h3 className="cart__price">${total}</h3>
    </div>
  );
};
