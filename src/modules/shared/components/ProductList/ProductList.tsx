import classNames from "classnames";

import styles from "./ProductList.module.scss";
import type { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard";

type Props = {
  products: Product[];
};

export const ProductList = ({ products }: Props) => {
  return (
    <div className={classNames(styles.productList, "grid")}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
