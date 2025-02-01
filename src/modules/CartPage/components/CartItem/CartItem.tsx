import style from './CartItem.module.scss';
import { removeFromCart, updateQuantity } from '../../../../state/cartSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/Product';

type Props = {
  product: Product;
  quantity: number;
};

export const CartItem: React.FC<Props> = ({ product, quantity }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (increment: number) => {
    dispatch(updateQuantity({ id: product.id, quantity: increment }));
  };

  return (
    <>
      <div className={style.cartItem}>
        <div className={style.cartItem__part}>
          <button
            className={style.cartItem__delete}
            onClick={() => dispatch(removeFromCart(product.id))}
          ></button>
          <Link to={`/phones/${product.itemId}`} key={product.id}>
            <img
              className={style.cartItem__image}
              src={product.image}
              alt={product.name}
            />
          </Link>
          <Link to={`/phones/${product.itemId}`} key={product.id}>
            <h2 className={style.cartItem__name}>{product.name}</h2>
          </Link>
        </div>
        <div className={style.cartItem__part}>
          <div className={style.cartItem__buttons}>
            <button
              disabled={quantity <= 1}
              className={style.cartItem__button}
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className={style.cartItem__button}
              onClick={() => handleQuantityChange(+1)}
            >
              +
            </button>
          </div>
          <p className={style.cartItem__price}>${product.price * quantity}</p>
        </div>
      </div>
    </>
  );
};
