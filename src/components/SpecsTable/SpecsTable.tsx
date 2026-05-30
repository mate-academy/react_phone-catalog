import styles from './SpecsTable.module.scss';
import classNames from 'classnames';

export type SpecRow = {
  label: string;
  value: string;
};

type Props = {
  specs: SpecRow[];
  variant?: 'small' | 'large';
};

export const SpecsTable = ({ specs, variant = 'large' }: Props) => (
  <div
    className={classNames(styles.specs, {
      [styles.full]: variant === 'small',
    })}
  >
    {specs.map(({ label, value }) => (
      <div key={label} className={styles.specRow}>
        <span className={styles.specLabel}>{label}</span>
        <span className={styles.specValue} title={value}>
          {value}
        </span>
      </div>
    ))}
  </div>
);
