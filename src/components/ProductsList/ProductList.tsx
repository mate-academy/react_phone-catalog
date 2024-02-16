import React from "react";
import "./ProductList.scss";
import { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard";

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="productList" data-cy="productList">
      {products.map((product) => (
        <li className="productList__item" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
