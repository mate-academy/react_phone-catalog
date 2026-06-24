import styles from "./ProductActionButtons.module.scss";
import React from "react";
import { AddButton } from "../AddButton";
import { LikeButton } from "../LikeButton";

export const ProductActionButtons: React.FC<{ id: number }> = ({ id }) => {
  return (
    <div className={styles.actionButtons}>
      <AddButton id={id} />
      <LikeButton id={id} />
    </div>
  );
};
