import React from "react";
import {useLocation} from "react-router-dom";

import {ProductsList} from "./ProductsList/ProductsList";
import {Breadcrumbs} from "../../Breadcrumbs/Breadcrumbs";
import {FilterBar} from "./FilterBar/Filterbar";
import {useAppSelector} from "../../../app/hooks";

export const ProductsPage: React.FC = () => {
  const {pathname} = useLocation();
  const {phones, tablets} = useAppSelector(state => state.products);

  const pathSegments = pathname.split("/").filter(segment => segment);

  const productName = pathSegments.map(
    segment => segment.charAt(0).toUpperCase() + segment.slice(1),
  );

  const counter =
    (pathname === "/phones" && phones.length) ||
    (pathname === "/tablets" && tablets.length) ||
    (pathname === "/accessories" && 0);

  return (
    <div className="container">
      <Breadcrumbs />

      <h1 className="title title-product-page title-custom">{productName}</h1>

      <p className="product-page__counter">{counter} models</p>

      <FilterBar />

      <div className="product-page__cards">
        <ProductsList />
      </div>
    </div>
  );
};
