import React, { useContext, useState } from 'react';
import { ProductType } from '../../helpers/types/ProductType';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { BASE_URL } from '../../helpers/utils/constants';
import { ProductsContext } from '../../store/ProductsContext';
import './Cart.scss';

type Props = {
  product: ProductType;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
};

export const Cart: React.FC<Props> = ({ product, setTotalPrice }) => {
  const { setCartedProducts } = useContext(ProductsContext);
  const [count, setCount] = useState(1);
  const { name, image, price } = product;

  const handleCloseClick = () => {
    setCartedProducts(cur => cur.filter(prod => prod.id !== product.id));
    setTotalPrice(cur => cur - price);
  };

  const increase = () => {
    setCount(cur => (cur + 1));
    setTotalPrice(cur => cur + price);
  };

  const decrease = () => {
    setCount(cur => (cur > 1 ? cur - 1 : 1));
    setTotalPrice(cur => {
      return cur - price > 0 ? cur - price : price;
    });
  };

  return (
    <div className="cart">
      <div className="cart__block">
        <ButtonIcon
          type="event"
          shape="close"
          dynamicClasses={['no-border']}
          onClick={handleCloseClick}
        />

        <img
          src={`${BASE_URL}${image}`}
          alt={name}
          className="cart__image"
        />

        <p className="cart__name">{name}</p>
      </div>

      <div className="cart__block cart__block--right">
        <div className="cart__increment">
          <ButtonIcon
            type="event"
            shape="minus"
            onClick={() => decrease()}
          />
          <p className="cart__count">{count}</p>

          <ButtonIcon
            type="event"
            shape="plus"
            disable={count <= 0}
            onClick={() => increase()}
          />
        </div>

        <div className="cart__price">{`$${price}`}</div>
      </div>
    </div>
  );
};
