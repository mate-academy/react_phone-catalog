import React from "react";
import styles from "./NoProducts.module.scss";
import classNames from "classnames";

interface Props {
  text?: string;
  message?: string;
}

export const NoProducts: React.FC<Props> = ({ text, message }) => {
  return (
    <div className={classNames(styles.noProducts)}>
      <h1 className={classNames("text-h1")}>
        {message || `There are no ${text || "products"} yet`}
      </h1>
    </div>
  );
};
