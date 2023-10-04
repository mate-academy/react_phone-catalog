import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import cross from '../imgs/icons/Close.svg';

import {
  deleteCart,
  incrementProductCount,
  discernmentProductCount,
} from '../Reducer/cartReducer';
import { Products } from '../type/Products';

type Props = {
  product: Products;
};

export const ProductField: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(incrementProductCount(product.itemId));
  };

  const discernment = () => {
    dispatch(discernmentProductCount(product.itemId));
  };

  return (
    <li className="cart__item productField" key={product.itemId}>
      <button
        type="button"
        onClick={() => dispatch(deleteCart(product.itemId))}
        className="productField__cross"
      >
        <img src={cross} alt="" />
      </button>

      <Link
        to={`/${product.category}/${product.itemId}`}
      >
        <img
          src={`new/${product.image}`}
          alt=""
          className="productField__image"
        />
      </Link>

      <Link
        to={`/${product.category}/${product.itemId}`}
        className="productField__name"
      >
        {product.name}
      </Link>

      <div className="productField__quantity">
        <button
          type="button"
          className="productField__quantity-button"
          disabled={product.count <= 1}
          onClick={() => discernment()}
        >
          -
        </button>
        <span className="productField__quantity-count">
          {product.count}
        </span>
        <button
          type="button"
          className="productField__quantity-button"
          onClick={() => increment()}
        >
          +
        </button>
      </div>

      <span className="productField__price">{`$${product.price * product.count}`}</span>
    </li>
  );
};
