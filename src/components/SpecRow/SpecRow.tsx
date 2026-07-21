import styles from './SpecRow.module.scss';

interface Props {
  label: string;
  value: string;
}

export const SpecRow = ({ label, value }: Props) => {
  return (
    <div className={styles.specRow}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};
