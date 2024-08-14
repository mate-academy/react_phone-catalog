import React from "react";

import {useAppDispatch} from "../../../../app/hooks";
import {actions as cartActions} from "../../../../features/cartSlice";

import {Product} from "../../../../types/Product";

type Props = {
  product: Product;
};
export const CartItemCard: React.FC<Props> = ({product}) => {
  const {name, price, image, quantity, capacity, color} = product;

  const dispatch = useAppDispatch();

  const handleIncQuantity = () => {
    dispatch(
      cartActions.incQuantity({
        ...product,
        color: color,
        capacity: capacity,
      }),
    );
  };

  const handleDecQuantity = () => {
    dispatch(
      cartActions.decQuantity({
        ...product,
        color: color,
        capacity: capacity,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(cartActions.remove(product));
  };

  return (
    <aside className="cart__card">
      <table className="cart__card__table">
        <tbody>
          <tr className="cart__card__table__row">
            <td className="cart__card__table__img">
              <img src={image[color]} alt="img" />
            </td>

            <td className="cart__card__table__name">
              {name} {capacity} {color}
            </td>

            <td className="cart__card__table__remove">
              <button
                className="cart__card__table__remove-btn"
                onClick={() => handleRemove()}
              >
                <img src="./img/icons/trash.svg" alt="" />
              </button>
            </td>

            <td className="cart__card__table__quantity">
              <span>Quantity:</span>
              <div className="cart__card__table__quantity-calc">
                <button
                  className="cart__card__table__dec"
                  onClick={() => handleDecQuantity()}
                  disabled={quantity === 1}
                >
                  <img width={16} src="./img/icons/minus.svg" alt="minus" />
                </button>

                <input type="number" value={quantity} />

                <button
                  className="cart__card__table__inc"
                  onClick={() => handleIncQuantity()}
                >
                  <img width={16} src="./img/icons/plus.svg" alt="plus" />
                </button>
              </div>

              <span>pcs.</span>
            </td>

            <td className="cart__card__table__price">
              <span>{price} USD</span>
            </td>
          </tr>
        </tbody>
      </table>
    </aside>
  );
};
