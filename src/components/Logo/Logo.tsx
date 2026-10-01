import styles from './Logo.module.scss';

type Props = {
  onClick: () => void;
};

export default function Logo({ onClick }: Props) {
  return (
    <button className={styles.logo} type="button" onClick={onClick}>
      <span className={styles.text}>
        <span>NICE 👌</span>
        <span>GADGETS</span>
      </span>
    </button>
  );
}
