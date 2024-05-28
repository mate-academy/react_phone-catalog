import React from "react";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../app/hooks";

export const UserLinksGroup: React.FC = () => {
  const products = useAppSelector(state => state.cart.products);
  const favorites = useAppSelector(state => state.favorite.favorite);

  const totalQuantity = products.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const totalFavorites = favorites.length;

  return (
    <>
      <NavLink
        to="/fav"
        className="
            header__nav-bar-right-fav
            header__custom-links

            user-links-group
            user-links-group__custom-links
            "
      >
        <div className="user-links-group__content-wrapp">
          <img
            src={`/img/header/fav.svg`}
            alt="liked"
            className="header__fav-img"
          />

          {!!totalFavorites && (
            <span className="user-links-group__q-indicator">
              {totalFavorites}
            </span>
          )}
        </div>
      </NavLink>

      <NavLink
        to="/cart"
        className="
          header__nav-bar-right-cart
          header__custom-links

          user-links-group
          user-links-group__custom-links
          "
      >
        <div className="user-links-group__content-wrapp">
          <img
            src={`/img/header/cart.svg`}
            alt="cart"
            className="header__cart-img"
          />

          {!!totalQuantity && (
            <span className="user-links-group__q-indicator">
              {totalQuantity}
            </span>
          )}
        </div>
      </NavLink>
    </>
  );
};
