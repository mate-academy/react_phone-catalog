import React, { useContext, useState } from "react";
import {
  DispatchContext,
  StateContext,
} from "../../providers/GlobalStateProvider";
import { NoProducts } from "../../components/NoProducts";
import styles from "./Cart.module.scss";
import classNames from "classnames";

const iconPath = {
  iconClose: "/img/general/icons/close.svg",
  iconMinus: "/img/general/icons/minus.svg",
  iconPlus: "/img/general/icons/plus.svg",
  decrementIcon: "/img/general/icons/minus-white.svg",
  incrementIcon: "/img/general/icons/close-white.svg",
};

export const CartPage: React.FC = () => {
  const { cartIds, allProducts } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);

  const close = (id: number) => {
    if (cartIds.some(obj => obj.id === id)) {
      dispatch({ type: "REMOVE_CARD", payload: id });
    }
  };

  const cartProducts = allProducts.filter(product =>
    cartIds.find(obj => product.id === obj.id),
  );

  const totalPrice = cartProducts.reduce((acc, curr) => {
    const count = cartIds.find(obj => obj.id === curr.id)?.count || 0;
    acc += curr.price * count;

    return acc;
  }, 0);

  const totalItems = cartIds.reduce((total, curr) => curr.count + total, 0);

  const handleCheckoutButton = () => {
    const message =
      "Checkout is not implemented yet. Do you want to clear the Cart?";
    const answer = confirm(message);

    if (answer) {
      setIsCheckout(answer);

      cartIds.forEach(product =>
        dispatch({ type: "REMOVE_CARD", payload: product.id }),
      );
    }
  };

  return cartProducts.length !== 0 ? (
    <section className={styles.styles}>
      <h1 className={classNames(styles.tittle, "text-h1")}>Cart</h1>
      <div className={styles.content}>
        <ul className={styles.cards}>
          {!isCheckout &&
            cartProducts.map(({ image, name, price, id }) => {
              const shortProduct = cartIds.find(obj => obj.id === id);

              const totalPriceForProduct = shortProduct
                ? price * shortProduct?.count
                : 0;
              return (
                <li className={styles.card} key={id}>
                  <div className={styles.cardTop}>
                    <div className={styles.iconWrapper}>
                      <button
                        onClick={() => close(id)}
                        className={classNames(styles.closeButton, "button")}
                      >
                        <img src={iconPath.iconClose} alt="closing picture" />
                      </button>
                      <img
                        className={styles.cardPicture}
                        src={image}
                        alt="card image"
                      />
                    </div>
                    <h3 className="text-body">{name}</h3>
                  </div>
                  <div className={styles.cardBottom}>
                    <div className={styles.cardButtons}>
                      <button
                        className="hover button"
                        onClick={() => {
                          dispatch({ type: "REMOVE_ONE", payload: id });
                        }}
                      >
                        <img
                          src={iconPath.decrementIcon}
                          alt="decrement-icon"
                        />
                      </button>
                      <span className={classNames(styles.count, "text-body")}>
                        {shortProduct?.count}
                      </span>
                      <button
                        className="hover button"
                        onClick={() => {
                          dispatch({ type: "ADD_CARD", payload: id });
                        }}
                      >
                        <img
                          src={iconPath.incrementIcon}
                          alt="increment-icon"
                          className={styles.incrementIcon}
                        />
                      </button>
                    </div>
                    <h3 className={classNames(styles.productPrice, "text-h3")}>
                      ${totalPriceForProduct}
                    </h3>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className={styles.checkout}>
          <h2 className="text-h2">${totalPrice}</h2>
          <p className={classNames(styles.cartSubtext, "text-body")}>
            {totalItems === 0
              ? ""
              : `${totalItems < 2 ? "Total for " + totalItems + " item" : "Total for " + totalItems + " items"}`}
          </p>
          <button
            className={classNames(
              styles.checkoutButton,
              "text-button",
              "action__add",
            )}
            onClick={handleCheckoutButton}
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  ) : (
    <NoProducts />
  );
};
