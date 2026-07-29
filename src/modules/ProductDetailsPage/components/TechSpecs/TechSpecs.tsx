import styles from './TechSpecs.module.scss';

type Props = {
  specs: { label: string; value: string }[];
};

export const TechSpecs = ({ specs }: Props) => (
  <ul className={styles.list}>
    {specs.map(({ label, value }) => (
      <li key={label} className={styles.row}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </li>
    ))}
  </ul>
);
