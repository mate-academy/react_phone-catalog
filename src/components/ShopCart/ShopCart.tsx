import React, { useContext } from 'react';
import cn from 'classnames';

import style from './ShopCart.module.scss';
import del from '../../../public/img/my-icon/close-grey.svg';
import { DispatchShop } from '../../provider/GlobalProvider';
import { Products } from '../../types/products';
import { ThemeContext } from '../../provider/ThemeContextProvider';
import { Link } from 'react-router-dom';

type Props = {
  card: Products;
};

export const Card: React.FC<Props> = ({ card }) => {
  const dispatchShop = useContext(DispatchShop);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={style.card}>
      <div className={style.card__container}>
        <button
          className={style.card__button}
          onClick={() => dispatchShop({ type: 'delete', payload: card })}
        >
          <img className={style.card__button__icon} src={del} alt="X" />
        </button>

        <Link
          to={`/${card.category}/${card.itemId}`}
          className={style.card__info}
        >
          <img className={style.card__photo} src={card.image} alt={card.name} />

          <p className={style.card__title}>{card.name}</p>
        </Link>
      </div>
      <div className={style.card__amount}>
        <div className={style.counter}>
          <button
            disabled={card.quantity === 1}
            className={cn(
              `${style.counter__button} ${style['counter__button--subtract']}`,
              {
                [style[`counter__button--subtract-${theme}`]]: theme,
              },
            )}
            onClick={() => dispatchShop({ type: 'minus', payload: card })}
          ></button>

          <p className={style.counter__value}>{card.quantity}</p>

          <button
            className={cn(
              `${style.counter__button} ${style['counter__button--add']}`,
              {
                [style[`counter__button--add-${theme}`]]: theme,
              },
            )}
            onClick={() => dispatchShop({ type: 'add', payload: card })}
          ></button>
        </div>
        <p className={style.card__price}> ${`${card.price * card.quantity}`}</p>
      </div>
    </div>
  );
};
