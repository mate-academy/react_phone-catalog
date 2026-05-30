import {
  AiOutlineClose,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from 'react-icons/ai';
import style from './ProductInCart.module.scss';
import { Product } from '../../types/Product';
import { useContext } from 'react';
import { CartContext } from '../../store/CartProvider';
import cn from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  prod: Product;
};

export const ProductInCart: React.FC<Props> = ({ prod }) => {
  const { setCart, handleAddButton } = useContext(CartContext);

  const handleMinusCount = () =>
    setCart(prev =>
      prev.map(item =>
        item.id === prod.id && item.inCart
          ? { ...item, inCart: item.inCart - 1 }
          : item,
      ),
    );

  const handlePlusCount = () =>
    setCart(prev =>
      prev.map(item =>
        item.id === prod.id && item.inCart
          ? { ...item, inCart: item.inCart + 1 }
          : item,
      ),
    );

  return (
    <div className={style.product}>
      <div className={style.about}>
        <AiOutlineClose
          className={style.about__close}
          size={16}
          onClick={() => handleAddButton(prod)}
        />
        <Link
          to={`/${prod.category}/${prod.itemId}`}
          className={style.about__imgLink}
        >
          <img src={prod.image} alt="phone" className={style.about__img} />
        </Link>
        <Link
          to={`/${prod.category}/${prod.itemId}`}
          className={style.about__title}
        >
          {prod.name}
        </Link>
      </div>
      <div className={style.actions}>
        <div className={style.actions__buttons}>
          <button
            onClick={handleMinusCount}
            disabled={prod.inCart && prod.inCart < 2 ? true : false}
            className={cn(style.actions__buttons__button, {
              [style['actions__buttons__button--unactive']]:
                prod.inCart && prod.inCart < 2,
            })}
          >
            <AiOutlineMinusCircle
              size={24}
              style={
                prod.inCart && prod.inCart < 2
                  ? { fill: '#b4bdc3' }
                  : { fill: '' }
              }
            />
          </button>
          <p className={style.actions__buttons__count}>
            {prod.inCart ? prod.inCart : '000'}
          </p>
          <button
            onClick={handlePlusCount}
            className={style.actions__buttons__button}
          >
            <AiOutlinePlusCircle size={24} />
          </button>
        </div>
        <h3 className={style.actions__price}>
          ${prod.price * (prod.inCart || 1)}
        </h3>
      </div>
    </div>
  );
};
