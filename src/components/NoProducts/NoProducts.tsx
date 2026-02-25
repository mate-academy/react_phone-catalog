import React from "react";
import styles from "./NoProducts.module.scss";
import classNames from "classnames";

export const NoProducts: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className={classNames(styles.noProducts)}>
      <h1 className={classNames("text-h1")}>
        There no {text || "products"} yet
      </h1>
    </div>
  );
};
