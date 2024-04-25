import React from "react";
import { useContext } from 'react';
import { Product } from '../../types/product';
import Arrow_Left from '../../images/homePage/Arrow_Left.svg';
import Arrow_Right from '../../images/homePage/Arrow_Right.svg';
import Vector_light_left from '../../images/homePage/Vector_light_left.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import './YouMayAlsoLike.scss';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CatalogContext } from "../../pages/CatalogContext";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { Link, useLocation } from "react-router-dom";
import { last, sliceToShow } from "../../helpers/sliceToShow";

export const YouMayAlsoLike = () => {
  const { products,
    elOnPage,
    currentPage,
    handlePreviousPage, 
    handleNextPage, } = useContext(CatalogContext);

  const { pathname } = useLocation();

  const paths = pathname.split('/').filter((path) => path);

  if (!products) {
    return <NotFoundPage/>;
  }

  const shuffle = products.sort(() => Math.round(Math.random() * 100) - 50);

  const getSortProducts = sliceToShow(shuffle, currentPage, elOnPage);;

  const lastPage = last(shuffle, elOnPage);

  return (
    <div className="hotPrices">
      <div className="hotPrices__container">
        <div className="hotPrices__top">
          <h1 className="hotPrices__head">You may also like</h1>
          <div className="hotPrices__arrays">
            <button
              className="hotPrices__arrays__button
              hotPrices__arrays__left"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <img
                src={
                  currentPage === 1 ? `${Vector_light_left}` : `${Arrow_Left}`
                }
                className="hotPrices__arrays__img"
                alt={Arrow_Left}
              />
            </button>
            <button
              className="hotPrices__arrays__button"
              onClick={handleNextPage}
              disabled={currentPage === lastPage}
            >
              <img
                src={
                  currentPage === lastPage
                    ? `${Vec_light_right}`
                    : `${Arrow_Right}`
                }
                className="hotPrices__arrays__img"
                alt={Arrow_Right}
              />
            </button>
          </div>
        </div>
        <div className="hotPrices__cards">
          <div className="hotPrices__ribbon">
            {getSortProducts.map((item: Product) => (
              <Link
                key={item.id}
                to={{pathname: `/${paths[0]}/${item.itemId}`}}
                className="productsPage__link"
              >
                <ProductCard product={item} key={item.id} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};
