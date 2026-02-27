import classNames from "classnames";
import styles from "./AddButton.module.scss";
import React, { useContext } from "react";
import {
  DispatchContext,
  StateContext,
} from "../../providers/GlobalStateProvider";

interface Props {
  id: number;
}

export const AddButton: React.FC<Props> = ({ id }) => {
  const { cartIds } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const isCartId = cartIds.some(card => card.id === id);

  const addCard = () => {
    if (!isCartId) {
      dispatch({ type: "ADD_CARD", payload: id });
    } else if (isCartId) {
      dispatch({ type: "REMOVE_ONE", payload: id });
    }
  };

  return (
    <button
      className={classNames(styles.addButton, "text-button", {
        [styles.addedToCards]: isCartId,
        [styles.hover]: !isCartId,
      })}
      onClick={addCard}
    >
      {isCartId ? "Added" : "Add to cart"}
    </button>
  );
};
