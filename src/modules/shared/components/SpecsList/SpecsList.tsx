import classNames from 'classnames';
import styles from './SpecsList.module.scss';

export interface Spec {
  label: string;
  value: string;
}

interface Props {
  specs: Spec[];
  className?: string;
}

export const SpecsList = ({ specs, className }: Props) => (
  <dl className={classNames(styles.specs, className)}>
    {specs.map(({ label, value }) => (
      <div key={label} className={styles.spec}>
        <dt className={styles.label}>{label}</dt>
        <dd className={styles.value}>{value}</dd>
      </div>
    ))}
  </dl>
);
