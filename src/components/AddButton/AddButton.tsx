import React from "react";

import {useAppDispatch} from "../../app/hooks";

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
  const [isAdding, setIsAdding] = React.useState(false);

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

  if (!product) return null;

  return (
    <button
      className="add__button"
      onClick={e => handleAddToCart(e, product)}
      disabled={isAdding}
    >
      <div className={isAdding ? "hide-out" : "show-in"}>Add to Bag</div>

      {isAdding && (
        <div
          className={classNames("loader__wrapper", {
            "show-in": isAdding,
            "hide-out": !isAdding,
          })}
        >
          <Loader />
        </div>
      )}
    </button>
  );
};
