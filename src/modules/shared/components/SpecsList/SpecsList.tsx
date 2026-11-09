import classNames from 'classnames';
import styles from './SpecsList.module.scss';

export interface Spec {
  label: string;
  value: string;
}

interface Props {
  specs: Spec[];
  size?: 'small' | 'medium';
  className?: string;
}

export const SpecsList = ({ specs, size = 'small', className }: Props) => (
  <dl
    className={classNames(styles.specs, className, {
      [styles.medium]: size === 'medium',
    })}
  >
    {specs.map(({ label, value }) => (
      <div key={label} className={styles.spec}>
        <dt className={styles.label}>{label}</dt>
        <dd className={styles.value}>{value}</dd>
      </div>
    ))}
  </dl>
);
