import React, {useEffect, useState} from "react";

import {useAppDispatch, useAppSelector} from "../../app/hooks";

import {actions as cartActions} from "../../features/cartSlice";

import {Product} from "../../types/Product";
import classNames from "classnames";

import {Loader} from "../Loader/Loader";

type Props = {
  price?: number;
  capacity?: string;
  color?: string;
  product: Product | null;
};

export const AddButton: React.FC<Props> = ({
  product,
  color,
  capacity,
  price,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const products = useAppSelector(state => state.cart.products);
  const dispatch = useAppDispatch();

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    localProduct: Product,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setIsAdding(true);

    if (capacity && color && price) {
      dispatch(
        cartActions.add({
          ...localProduct,
          color: color,
          capacity: capacity,
          price: price,
        }),
      );
    } else {
      dispatch(cartActions.add(localProduct));
    }

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  useEffect(() => {
    setIsInCart(
      products.some(
        item =>
          item.id === product?.id
      ),
    );
  }, [products, product, color, capacity]);

  if (!product) return null;

  return (
    <button
      className={classNames("add__button", {
        "in-cart": isInCart,})}
      onClick={e => handleAddToCart(e, product)}
      disabled={isAdding}
    >
      <div
        className={classNames({
          "hide-out": isAdding,
          "show-in": !isAdding,
        })}
      >
        {isInCart ? "+ Add More" : "Add to Bag"}
      </div>

      {isAdding && (
        <div
          className={classNames("loader__wrapper", {
            "show-in": isAdding,
            "hide-out": !isAdding,
          })}
        >
          <Loader value={isInCart} />
        </div>
      )}
    </button>
  );
};
