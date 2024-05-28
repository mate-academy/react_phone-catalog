import React from "react";
import {useLocation, useSearchParams} from "react-router-dom";

import {useAppSelector} from "../../../../app/hooks";

import {Pagination} from "../Pagination/Pagination";
import {Card} from "../../../Card/Card";

import {Product} from "../../../../types/Product";

export const ProductsList: React.FC = () => {
  const {pathname} = useLocation();
  const {phones, tablets} = useAppSelector(state => state.products);

  const [seartchParams] = useSearchParams();
  const size = Number(seartchParams.get("size")) || 8;
  const sort = seartchParams.get("sort");

  const startIndex = (Number(seartchParams.get("page") || 1) - 1) * size;
  const endIndex = startIndex + size;

  const getProducts = () => {
    const localPhones = [...phones];

    let products: Product[] = [];

    if (sort === "asc") {
      products = localPhones.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      products = localPhones.sort((a, b) => b.price - a.price);
    }

    if (pathname === "/phones") {
      products = localPhones.slice(startIndex, endIndex);
    } else if (pathname === "/tablets") {
      products = tablets.slice(startIndex, endIndex);
    }

    return products;
  };

  const getProductsLength = (path: string) => {
    switch (path) {
      case "/phones":
        return phones.length;

      case "/tablets":
        return tablets.length;

      default:
        return 0;
    }
  };

  return (
    <>
      <ul className="product-page__cards__list">
        {getProducts().map((product: Product) => {
          const {id} = product;

          return (
            <li key={id} className="product-page__cards__item">
              <Card product={product} />
            </li>
          );
        })}
      </ul>

      {!!getProducts().length && (
        <Pagination total={getProductsLength(pathname)} />
      )}
    </>
  );
};
