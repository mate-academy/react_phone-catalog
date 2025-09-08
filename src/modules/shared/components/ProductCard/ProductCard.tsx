import React from "react";
import { Link } from "react-router-dom";
import { CustomButton } from "../Button";

import { useAppSelector } from "../../../../app/store/hooks";

import type { Product } from "../../types/Product";

import styles from "./ProductCard.module.scss";

type Props = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard: React.FC<Props> = ({ product, showFullPrice }) => {
  const cartProducts = useAppSelector((state) => state.cart.items);
  const favouritesProduct = useAppSelector((state) => state.favourites.items);

  return (
    <article className={styles.card}>
      <Link
        className={styles.cardContainer}
        to={`/${product.category}/${product.itemId}`}
      >
        <img
          className={styles.cardImage}
          src={product.image}
          alt={product.name}
        />
      </Link>
      <Link
        className={styles.cardTitle}
        to={`/${product.category}/${product.itemId}`}
      >
        {product.name}
      </Link>
      <h3 className={styles.cardPrice}>
        ${product.price}
        {showFullPrice && (
          <span className={styles.cardFullPrice}>${product.fullPrice}</span>
        )}
      </h3>
      <hr className={styles.divider} />
      <ul className={styles.cardDescription}>
        <li className={styles.cardInfo}>
          <span className={styles.cardFeature}>Screen</span>
          <span className={styles.cardValue}>{product.screen}</span>
        </li>
        <li className={styles.cardInfo}>
          <span className={styles.cardFeature}>Capacity</span>
          <span className={styles.cardValue}>{product.capacity}</span>
        </li>
        <li className={styles.cardInfo}>
          <span className={styles.cardFeature}>RAM</span>
          <span className={styles.cardValue}>{product.ram}</span>
        </li>
      </ul>
      <div className={styles.cardActions}>
        <CustomButton
          className={"addCart"}
          isActive={Boolean(cartProducts.find((item) => item.id === product.id))}
          id={product.id}
        />
        <CustomButton
          className={"addFavourites"}
          isActive={Boolean(
            favouritesProduct.find((item) => item.id === product.id)
          )}
          id={product.id}
        />
      </div>
    </article>
  );
};
