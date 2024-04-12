import { Banner } from "./Banner/Banner";
import { HotPrices } from "./HotPrices/HotPrices";
import './HomePage.scss';
import { Category } from "./Category/Category";
import { BrandNew } from "./BrandNew/BrandNew";
import React from "react";

export const HomePage = () => {
  return (
    <div className="homePage">
      <Banner />
      <BrandNew />
      <Category />
      <HotPrices />
    </div>
  );
};