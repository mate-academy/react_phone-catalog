import styles from './ProductOptions.module.scss';

type Props = {
  capacities: string[];
  selectedCapacity: string;
  onCapacitySelect: (color: string) => void;
};

export const ProductCapacities: React.FC<Props> = ({
  capacities,
  selectedCapacity,
  onCapacitySelect,
}) => {
  return (
    <>
      <p className={`${styles.label} ${styles.labelWithMargin}`}>
        Select capacity
      </p>

      <div className={styles.capacities}>
        {capacities.map(capacity => (
          <button
            key={capacity}
            type="button"
            onClick={() => onCapacitySelect(capacity)}
            className={
              capacity === selectedCapacity
                ? styles.activeCapacity
                : styles.capacity
            }
          >
            {capacity}
          </button>
        ))}
      </div>
    </>
  );
};
