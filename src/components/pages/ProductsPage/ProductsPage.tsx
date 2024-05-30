import React from "react";
import {Link, useLocation} from "react-router-dom";

import {ProductsList} from "./ProductsList/ProductsList";
import {Breadcrumbs} from "../../Breadcrumbs/Breadcrumbs";
import {FilterBar} from "./FilterBar/Filterbar";
import {useAppSelector} from "../../../app/hooks";

export const ProductsPage: React.FC = () => {
  const {pathname} = useLocation();
  const {phones, tablets, acessories} = useAppSelector(state => state.products);

  const pathSegments = pathname.split("/").filter(segment => segment);

  const productName = pathSegments.map(
    segment => segment.charAt(0).toUpperCase() + segment.slice(1),
  );

  const counter =
    (pathname === "/phones" && phones.length) ||
    (pathname === "/tablets" && tablets.length) ||
    (pathname === "/accessories" && acessories.length);

  return (
    <div className="container">
      <Breadcrumbs />

      <h1 className="title title-product-page title-custom">{productName}</h1>

      <p className="product-page__counter">{counter} models</p>

      {!!counter && <FilterBar />}

      <div className="product-page__cards">
        {!!counter ? (
          <ProductsList />
        ) : (
          <div className="product-page__empty-list">
            <img
              className="product-page__empty-list__img"
              src="./img/products/soldout.svg"
              alt="sold-out"
            />

            <div className="product-page__empty-list__info-wrapper">
              <p className="product-page__empty-list__info-text">
                <span>Oops!</span>
                <br />
                <br />
                It looks like your train has left the station!
                <br />
                <br />
                But cheer up, there’s still plenty of great stuff you can enjoy
                from our selection!
              </p>

              <Link to="/" className="product-page__empty-list__info-btn">
                <img
                  width={16}

                  src="./img/icons/arrow-back.svg"
                  alt="arrow-back"
                />
                Go Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
