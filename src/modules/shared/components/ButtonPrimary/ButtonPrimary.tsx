import styles from './ButtonPrimary.module.scss';

type Props = {
  onClick?: () => void;
  title: string;
};

export const ButtonPrimary: React.FC<Props> = ({
  onClick = () => {},
  title,
}) => {
  return (
    <button className={styles['button-primary']} onClick={onClick}>
      {title}
    </button>
  );
};
