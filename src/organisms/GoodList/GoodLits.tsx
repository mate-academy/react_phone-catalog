import { FC } from "react";
import { GoodCard } from "./ui/GoodCard";
import { Phone } from "@/types/phone";
import styles from './GoodList.module.scss';

type Props = {
  items: Phone[];
}

export const GoodList: FC<Props> = ({ items }) => {
  return (
    <div className={styles.list}>
      {items.map(item => {
        return (
          <GoodCard key={item.id} item={item} />
        )
      })}
    </div>
  )
}
