import styles from './NotFound.module.scss';

type Props = {
  title: string;
  imgSrc: string;
};

export const NotFound: React.FC<Props> = ({ title, imgSrc }) => {
  return (
    <div>
      <h2 className={styles.notFoundTitle}>{title}</h2>

      <div className={styles.imgContainer}>
        <img
          src={`./img/${imgSrc}`}
          alt=""
          className={styles.notFoundPageImg}
        />
      </div>
    </div>
  );
};
