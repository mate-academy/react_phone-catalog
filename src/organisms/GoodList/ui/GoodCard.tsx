import styles from './GoodCard.module.scss'

import { Phone } from "@/types/phone";
import { FC } from "react";

type Props = {
  item: Phone
}

export const GoodCard: FC<Props> = ({ item }) => {
  return (
    <div className={styles.card}>
      <img className={styles.card__img} src={item.images[0]} />
      <label>{item.name}</label>

      {item.id}
    </div>
  );
}
