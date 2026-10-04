import cn from 'classnames';
import styles from './SpecsList.module.scss';

interface Props {
  specs: [string, string][];
  variant?: 'compact' | 'regular';
}

export const SpecsList = ({ specs, variant = 'regular' }: Props) => (
  <dl className={cn(styles.list, styles[variant])}>
    {specs.map(([label, value]) => (
      <div key={label} className={styles.row}>
        <dt className={styles.label}>{label}</dt>
        <dd className={styles.value}>{value}</dd>
      </div>
    ))}
  </dl>
);
