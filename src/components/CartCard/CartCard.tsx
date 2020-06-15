import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCartGood, increaseGoodCount, decreaseGoodCount } from '../../store/cart';
import { Plus, Minus, Delete } from '../../components/SvgSprite/SvgSprite';

type CartCardProps = {
  good: Good;
  goodCount: number;
}

export const CartCard: React.FC<CartCardProps> = ({ good, goodCount }) => {
  const {
    id,
    imageUrl,
    name,
    price,
  } = good;

  const dispatch = useDispatch();

  return (
    <section className="cart-card">
      <div className="cart-card__wrapper">
        <div className="cart-card__delete">
          <button className="cart-card__delete-btn"
            type="button"
            onClick={() => dispatch(removeCartGood(id))}
          >
            <Delete />
          </button>
        </div>
        <div className="cart-card__img-container">
        <img
          className="cart-card__img"
          src={imageUrl}
          alt={name} />
        </div>
        <div className="cart-card__title">{name}</div>
      </div>
      <div className="cart-card__count">
        <button className="cart-card__count-minus"
          type="button"
          onClick={() => dispatch(decreaseGoodCount(good.id))}
        >
          <Minus />
        </button>
        <span className="cart-card__count-number">
          {goodCount}
        </span>
        <button className="cart-card__count-plus"
          type="button"
          onClick={() => dispatch(increaseGoodCount(good.id))}
        >
          <Plus />
        </button>
      </div>
      <div className="cart-card__price">{"$" + price}</div>
    </section>
  )
}
