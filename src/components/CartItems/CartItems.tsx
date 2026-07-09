import { Product } from '../../types/Product';
import { addCart, deleteItem, removeCart } from '../../features/cart';
import { useDispatch } from 'react-redux';
import style from './CartItems.module.scss';
import { Link } from 'react-router-dom';
import plus from '../../assets/img/icons/plus.svg';
import minus from '../../assets/img/icons/minus.svg';
import minusNoActive from '../../assets/img/icons/minus-no-active.svg';
type Props = {
  product: Product & { count: number };
};
export const CartItems: React.FC<Props> = ({ product }) => {
  const { image, name, price, itemId, category, count } = product;
  const dispatch = useDispatch();

  const addItem = () => dispatch(addCart(itemId));
  const removeItem = () => dispatch(removeCart(itemId));
  const clearItem = () => dispatch(deleteItem(itemId));

  const disabledBtn = count === 1;

  return (
    <div className={style.product}>
      <div className={style.about}>
        <span className={style.about__close} onClick={clearItem} />
        <Link to={`/${category}/${itemId}`} className={style.about__imgLink}>
          <img src={image} alt="phone" className={style.about__img} />
        </Link>
        <Link to={`/${category}/${itemId}`} className={style.about__title}>
          {name}
        </Link>
      </div>
      <div className={style.actions}>
        <div className={style.count}>
          <button
            className={style.count__btn}
            onClick={removeItem}
            disabled={disabledBtn}
          >
            <img src={disabledBtn ? minusNoActive : minus} alt="Minus" />
          </button>
          <span className={style.count__text}>{count}</span>
          <button className={style.count__btn} onClick={addItem}>
            <img src={plus} alt="Plus" />
          </button>
        </div>
        <div className={style.price}>
          <span className={style.price__text}>${price}</span>
        </div>
      </div>
    </div>
  );
};
