import styles from './Button.module.scss';

type Props = {
  text: string;
};

export const Button = ({ text }: Props) => {
  return (
    <>
      <button className={styles.button}>{text}</button>
    </>
  );
};
