import React, {useCallback} from "react";
import {Link, useLocation} from "react-router-dom";

import {useAppDispatch} from "../../app/hooks";

import {actions as selectedProductActions} from "../../features/selectedProductSlice";

import {Product} from "../../types/Product";

import {AddButton} from "../AddButton/AddButton";
import {FavButton} from "../FavButton/FavButton";

type Props = {
  index?: number;
  product: Product;
};

export const Card: React.FC<Props> = ({product}) => {
  const {
    name,
    screen,
    capacity,
    ram,
    price,
    image,
    productId,
    category,
    color,
  } = product;

  const {pathname} = useLocation();

  const determinePath = (path: string, localCategory: string) => {
    if (path === "/fav" || path === "/") {
      return `/${localCategory}`;
    }
    return path;
  };

  const path = determinePath(pathname, category);

  const dispatch = useAppDispatch();

  const setSelectedProduct = useCallback(() => {
    dispatch(selectedProductActions.addProduct(product));
  }, []);
  
  return (
    <Link
      className="card__link"
      to={`${path}/${productId}`}
      onClick={setSelectedProduct}
    >
      <aside className="card">
        <img className="card__img" src={image[color]} alt="product" />

        <h3 className="card__title">{name}</h3>

        <div className="card__info">
          <ul className="card__info__props">
            <li className="card__info__prop">Screen</li>
            <li className="card__info__prop">Capacity</li>
            <li className="card__info__prop">RAM</li>
          </ul>

          <ul className="card__info__values">
            <li className="card__info__val">{screen}</li>
            <li className="card__info__val">{capacity}</li>
            <li className="card__info__val">{ram}</li>
          </ul>
        </div>

        <div className="card__bottom">
          <p className="card__bottom__price">{price} USD</p>

          <FavButton product={product} color={color} capacity={capacity} />
        </div>

        <AddButton product={product} />
      </aside>
    </Link>
  );
};
