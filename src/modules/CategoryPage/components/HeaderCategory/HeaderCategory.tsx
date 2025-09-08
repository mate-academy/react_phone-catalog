import { useAppSelector } from "../../../../app/store/hooks";
import { useParams } from "react-router-dom";

import { categoryMap } from "../../constants/categoryMap";

import styles from "./HeaderCategory.module.scss";

export const HeaderCategory = () => {
  const products = useAppSelector((state) => state.product.items);

  const { categoryName } = useParams<{ categoryName: string }>();

  const quantityModels = products.filter(
    (item) => item.category === categoryName
  );

  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>
        {categoryMap[categoryName as keyof typeof categoryMap]}
      </h1>
      <p className={styles.headerQuantity}>{quantityModels.length} models</p>
    </div>
  );
};
