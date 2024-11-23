import { Link } from 'react-router-dom';
import {
  decreaseCount,
  increaseCount,
  removeToCart,
} from '../../redux/features/cartSlice';
import { useAppDispatch } from '../../redux/hooks';
import { Product } from '../../types/Product';
import style from './CartItem.module.scss';

type Props = {
  product: Product;
};

const CartItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();

  const { image, name, price, count, itemId, category } = product;

  const handleRemoveProduct = (prodId: string) => {
    dispatch(removeToCart(prodId));
  };

  const handleDecreaseCount = (prodId: string) => {
    dispatch(decreaseCount(prodId));
  };

  const handleIncreaseCount = (prodId: string) => {
    dispatch(increaseCount(prodId));
  };

  return (
    <article className={style.item}>
      <div className={style.top}>
        <button
          className={style.delete}
          onClick={() => handleRemoveProduct(itemId)}
        >
          <img src="./img/icons/delete.svg" alt="delete" />
        </button>

        <Link to={`/${category}/${itemId}`} className={style.title}>
          <img className={style.device} src={`./${image}`} alt="Device" />
        </Link>

        <Link to={`/${category}/${itemId}`} className={style.title}>
          {name}
        </Link>
      </div>

      <div className={style.bottom}>
        <div className={style.counter}>
          <button
            className={`${style.btn} ${count === 1 ? style.disabled : ''}`}
            onClick={() => handleDecreaseCount(itemId)}
            disabled={count === 1}
          >
            <img src="./img/icons/minus.svg" alt="Remove" />
          </button>

          <span className={style.count}>{count}</span>

          <button
            className={`${style.btn}`}
            onClick={() => handleIncreaseCount(itemId)}
          >
            <img src="./img/icons/plus.svg" alt="Add" />
          </button>
        </div>

        <span className={style.price}>${price}</span>
      </div>
    </article>
  );
};

export default CartItem;
