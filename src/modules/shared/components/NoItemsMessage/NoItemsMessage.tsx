import styles from './NoItemsMessage.module.scss';

type Props = {
  message: string;
};

export const NoItemsMessage: React.FC<Props> = ({ message }) => {
  return <p className={styles.text}>{message}</p>;
};
