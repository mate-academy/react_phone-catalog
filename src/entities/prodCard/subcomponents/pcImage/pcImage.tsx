import styles from './pcImage.module.scss';

type Props = {
  image: string;
};

export const PCImage: React.FC<Props> = ({ image }) => {
  return (
    <figure className={styles.pcWrapper}>
      <img className={styles.pcWrapper__image} src={image}></img>
    </figure>
  );
};
