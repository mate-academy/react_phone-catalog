import React from "react";
import styles from "./Card.module.scss";

import classNames from "classnames";
import { Link } from "react-router-dom";
import { ProductActionButtons } from "../ProductActionButtons";
import { getAssetPath } from "../../utils";

interface Props {
  id: number;
  name: string;
  price: number;
  screen: string;
  ram: string;
  image: string;
  capacity: string;
}

export const Card: React.FC<Props> = ({
  id,
  name,
  price,
  screen,
  ram,
  image,
  capacity,
}) => {
  const imagePath = getAssetPath(image);

  return (
    <li className={styles.item}>
      <Link to={`/product/${id}`}>
        <img className={styles.image} alt={name} src={imagePath} />
      </Link>

      <div className={styles.wrapper}>
        <h3 className={`${styles.name} text-body`}>{name}</h3>
        <p className={`${styles.price} text-h2`}>${price}</p>
        <div className={styles.characteristics}>
          <div className={styles.row}>
            <p className="text-small">Screen</p>
            <p className={classNames(styles.value, "text-uppercase")}>
              {screen}
            </p>
          </div>
          <div className={styles.row}>
            <p className="text-small">Capacity</p>
            <p className={classNames(styles.value, "text-uppercase")}>
              {capacity}
            </p>
          </div>
          <div className={styles.row}>
            <p className="text-small">RAM</p>
            <p className={classNames(styles.value, "text-uppercase")}>{ram}</p>
          </div>
        </div>
        <div className={styles.action}>
          <ProductActionButtons id={id} />
        </div>
      </div>
    </li>
  );
};
