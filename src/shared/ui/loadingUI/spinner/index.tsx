import styles from './spinner.module.scss';

type Props = {
  className?: string;
};

export const Spinner = ({ className }: Props) => (
  <div className={className}>
    <div className={styles.spinner__circle}></div>
  </div>
);
