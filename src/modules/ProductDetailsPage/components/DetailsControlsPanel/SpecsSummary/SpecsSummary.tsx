import styles from "./SpecsSummary.module.scss";
import type { DetailsProps } from "../../../../shared/types/ProductDetails";

type SpecsSummaryProps = DetailsProps<
  "screen" | "resolution" | "processor" | "ram"
>;

export const SpecsSummary = ({
  screen,
  resolution,
  processor,
  ram,
}: SpecsSummaryProps) => {
  return (
    <ul className={styles.specsSummary}>
      <li className={styles.specsSummaryItem}>
        <span className={styles.specsSummaryName}>Screen</span>
        <span className={styles.specsSummaryValue}>{screen}</span>
      </li>
      <li className={styles.specsSummaryItem}>
        <span className={styles.specsSummaryName}>Resolution</span>
        <span className={styles.specsSummaryValue}>{resolution}</span>
      </li>
      <li className={styles.specsSummaryItem}>
        <span className={styles.specsSummaryName}>Processor</span>
        <span className={styles.specsSummaryValue}>{processor}</span>
      </li>
      <li className={styles.specsSummaryItem}>
        <span className={styles.specsSummaryName}>RAM</span>
        <span className={styles.specsSummaryValue}>{ram}</span>
      </li>
    </ul>
  );
};
