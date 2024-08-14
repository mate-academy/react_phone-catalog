import React from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

import {useAppSelector} from "../../../app/hooks";
import {Card} from "../../Card/Card";
import {nanoid} from "nanoid";

export const Favorite: React.FC = () => {
  const favorites = useAppSelector(state => state.favorite.favorite);

  const navigate = useNavigate();

  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="page__nav">
        <NavLink to="" onClick={handleGoBack} className="page__nav-link">
          <img src="./img/icons/arrow.svg" alt="" />
          Back
        </NavLink>
      </div>
      <h1
        className="
      title
      title-favorite
      title-custom"
      >
        Favorites
      </h1>

      <div className="favorite__content">
        {!favorites.length ? (
          <div className="favorite__content__empty">
            <img
              className="favorite__content__empty-img"
              src={"./img/favorite/favorite.svg"}
              alt=""
            />

            <p className="favorite__content__empty-text">
              Your favorites are as empty as my bank account after payday
            </p>

            <Link to="/" className="custom__link-btn">
              Continue Shoping
            </Link>
          </div>
        ) : (
          <div className="favorite__content__container">
            <div className="favorite__content__cards">
              <ul className="favorite__content__cards__list">
                {favorites.map(product => (
                  <li key={nanoid()} className="favorite__content__cards__item">
                    <Card product={product} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
