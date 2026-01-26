/* eslint-disable max-len */
import { useContext } from 'react';

// import Product from '../../../../types/Product';
// import Minus from '/img/icons/Minus.svg';
// import Plus from '/img/icons/Plus.svg';
import { ProductsContext } from '../../../../Context/ProductsContext';
import { CartItemType } from '../../../../types/CartItem';
import s from './CartItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

type Props = { product: CartItemType };

export const CartItem: React.FC<Props> = ({ product }) => {
  const { removeProdFromCart, changeQuontityInCart } =
    useContext(ProductsContext);

  return (
    <div
      className={`column is-flex is-align-items-center is-justify-content-space-between mb-4 ${s.cartItem}`}
      key={product.id}
    >
      <button
        type="button"
        className="delete"
        onClick={() => removeProdFromCart(product.id)}
      ></button>
      <img className="image is-64x64" src={product.image} alt={product.name} />
      <p>{product.name}</p>
      <div className="block">
        <button
          className=""
          onClick={() => changeQuontityInCart(product.id, 'decr')}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span>{product.quantity}</span>
        <button
          className=""
          onClick={() => changeQuontityInCart(product.id, 'incr')}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <p className="">${product.fullPrice * product.quantity}</p>
    </div>
  );
};
