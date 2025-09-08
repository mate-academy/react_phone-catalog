import { Link, useParams } from "react-router-dom";

import type { DetailsProps } from "../../../../shared/types/ProductDetails";

import styles from "./CapacitySelector.module.scss";

type CapacitySelectorProps = DetailsProps<
  "namespaceId" | "capacityAvailable" | "capacity" | "color"
>;

export const CapacitySelector = ({
  capacityAvailable,
  color,
  namespaceId,
  capacity,
}: CapacitySelectorProps) => {
  const { categoryName, productId } = useParams();

  //fix this
  if (!categoryName || !productId) {
    return null;
  }

  return (
    <div className={styles.capacity}>
      <p className={styles.capacityTitle}>Select capacity</p>
      <div className={styles.capacityOptions}>
        {capacityAvailable.map((capaci) => {
          const newProductId =
            namespaceId.toLowerCase() +
            "-" +
            capaci.toLowerCase() +
            "-" +
            color.toLowerCase();

          return (
            <Link
              key={capaci}
              to={`/${categoryName}/${newProductId}`}
              className={styles.capacityOption}
              data-selected={capacity === capaci}
            >
              {capaci}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
