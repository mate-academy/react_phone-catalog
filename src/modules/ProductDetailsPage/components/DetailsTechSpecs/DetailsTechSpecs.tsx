import type { DetailsProps } from "../../../shared/types/ProductDetails";
import styles from "./DetailsTechSpecs.module.scss";

type TechSpecsProps = DetailsProps<
  | "screen"
  | "resolution"
  | "processor"
  | "ram"
  | "capacity"
  | "camera"
  | "zoom"
  | "cell"
>;

export const DetailsTechSpecs = ({
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
}: TechSpecsProps) => {
  return (
    <div className={styles.techSpecs}>
      <h3 className={styles.techSpecsTitle}>Tech specs</h3>
      <ul className={styles.techSpecsList}>
        <li className={styles.techSpecsItem}>
          <span className={styles.techSpecsName}>Screen</span>
          <span className={styles.techSpecsValue}>{screen}</span>
        </li>
        <li className={styles.techSpecsItem}>
          <span className={styles.techSpecsName}>Resolution</span>
          <span className={styles.techSpecsValue}>{resolution}</span>
        </li>
        <li className={styles.techSpecsItem}>
          <span className={styles.techSpecsName}>Processor</span>
          <span className={styles.techSpecsValue}>{processor}</span>
        </li>
        <li className={styles.techSpecsItem}>
          <span className={styles.techSpecsName}>RAM</span>
          <span className={styles.techSpecsValue}>{ram}</span>
        </li>
        <li className={styles.techSpecsItem}>
          <span className={styles.techSpecsName}>Built in memory</span>
          <span className={styles.techSpecsValue}>{capacity}</span>
        </li>
        {camera && (
          <li className={styles.techSpecsItem}>
            <span className={styles.techSpecsName}>Camera</span>
            <span className={styles.techSpecsValue}>{camera}</span>
          </li>
        )}
        {zoom && (
          <li className={styles.techSpecsItem}>
            <span className={styles.techSpecsName}>Zoom</span>
            <span className={styles.techSpecsValue}>{zoom}</span>
          </li>
        )}
        <li className={styles.techSpecsItem}>
          <span className={styles.techSpecsName}>Cell</span>
          <span className={styles.techSpecsValue}>
            {cell.join(", ")}
          </span>
        </li>
      </ul>
    </div>
  );
};
