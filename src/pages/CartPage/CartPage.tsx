import React, { useContext, useState } from "react";
import {
  DispatchContext,
  StateContext,
} from "../../providers/GlobalStateProvider";
import { NoProducts } from "../../components/NoProducts";
import styles from "./Cart.module.scss";
import classNames from "classnames";
import { Modal } from "../../components/Modal";
import { AppSettingsContext } from "../../providers/AppSettingsProvider";
import { getAssetPath } from "../../utils";

const iconPath = {
  iconClose: getAssetPath("img/general/icons/close.svg"),
  decrementIconDark: getAssetPath("img/general/icons/minus-white.svg"),
  decrementIconLight: getAssetPath("img/general/icons/minus.svg"),
  incrementIconDark: getAssetPath("img/general/icons/close-white.svg"),
  incrementIconLight: getAssetPath("img/general/icons/close.svg"),
};

export const CartPage: React.FC = () => {
  const { cartIds, allProducts } = useContext(StateContext);
  const { labels, theme } = useContext(AppSettingsContext);
  const dispatch = useContext(DispatchContext);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

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

    return acc + curr.price * count;
  }, 0);

  const totalItems = cartIds.reduce((total, curr) => curr.count + total, 0);

  const clearCart = () => {
    cartIds.forEach(product => {
      dispatch({ type: "REMOVE_CARD", payload: product.id });
    });
    setIsCheckoutModalOpen(false);
  };

  return cartProducts.length !== 0 ? (
    <section className={styles.cart}>
      <h1 className={classNames(styles.tittle, "text-h1")}>Cart</h1>
      <div className={styles.content}>
        <ul className={styles.cards}>
          {cartProducts.map(({ image, name, price, id }) => {
            const shortProduct = cartIds.find(obj => obj.id === id);

            const totalPriceForProduct = shortProduct
              ? price * shortProduct.count
              : 0;

            return (
              <li className={styles.card} key={id}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrapper}>
                    <button
                      onClick={() => close(id)}
                      className={styles.closeButton}
                      type="button"
                    >
                      <img src={iconPath.iconClose} alt="closing picture" />
                    </button>
                    <img
                      className={styles.cardPicture}
                      src={getAssetPath(image)}
                      alt="card image"
                    />
                  </div>
                  <h3 className="text-body">{name}</h3>
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.cardButtons}>
                    <button
                      className={styles.countButton}
                      onClick={() => {
                        dispatch({ type: "REMOVE_ONE", payload: id });
                      }}
                      type="button"
                    >
                      <img
                        src={
                          theme === "light"
                            ? iconPath.decrementIconLight
                            : iconPath.decrementIconDark
                        }
                        alt="decrement-icon"
                      />
                    </button>
                    <span className={classNames(styles.count, "text-body")}>
                      {shortProduct?.count}
                    </span>
                    <button
                      className={styles.countButton}
                      onClick={() => {
                        dispatch({ type: "ADD_CARD", payload: id });
                      }}
                      type="button"
                    >
                      <img
                        src={
                          theme === "light"
                            ? iconPath.incrementIconLight
                            : iconPath.incrementIconDark
                        }
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
            className={classNames(styles.checkoutButton, "text-button")}
            onClick={() => setIsCheckoutModalOpen(true)}
            type="button"
          >
            {labels.checkout}
          </button>
        </div>
      </div>
      {isCheckoutModalOpen && (
        <Modal
          title={labels.checkoutTitle}
          message={labels.checkoutMessage}
          confirmText={labels.clearCart}
          cancelText={labels.keepItems}
          onConfirm={clearCart}
          onCancel={() => setIsCheckoutModalOpen(false)}
        />
      )}
    </section>
  ) : (
    <NoProducts />
  );
};
