import styles from './SpecsTable.module.scss';

interface Spec {
  label: string;
  value: string;
}

interface Props {
  specs: Spec[];
}

export const SpecsTable: React.FC<Props> = ({ specs }) => (
  <div className={styles.table}>
    {specs.map(spec => (
      <div key={spec.label} className={styles.row}>
        <span className={styles.label}>{spec.label}</span>
        <span className={styles.value}>{spec.value}</span>
      </div>
    ))}
  </div>
);
