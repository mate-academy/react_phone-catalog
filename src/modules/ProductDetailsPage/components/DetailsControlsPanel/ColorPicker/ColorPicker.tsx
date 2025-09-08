import { Link, useParams } from "react-router-dom";

import styles from "./ColorPicker.module.scss";
import type { DetailsProps } from "../../../../shared/types/ProductDetails";

type ColorPickerProps = DetailsProps<
  "colorsAvailable" | "color" | "namespaceId" | "capacity"
>;

export const ColorPicker = ({
  colorsAvailable,
  color,
  namespaceId,
  capacity,
}: ColorPickerProps) => {
  const { categoryName, productId } = useParams();

  //fix this
  if (!categoryName || !productId) {
    return null;
  }

  return (
    <div className={styles.colors}>
      <p className={styles.colorsTitle}>Available colors</p>
      <div className={styles.colorsPicker}>
        {colorsAvailable.map((col) => {
          const newProductId =
            namespaceId.toLowerCase() +
            "-" +
            capacity.toLowerCase() +
            "-" +
            col.toLowerCase();

          return (
            <Link
              className={styles.colorsOption}
              data-selected={color === col}
              to={`/${categoryName}/${newProductId}`}
              key={col}
              style={{ background: col }}
            >
              <div className={styles.colorsOptionInner} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
