import styles from './Loader.module.scss';
import loaderSVG from './eclipse-half.svg';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <img className={styles.loader__svg} src={loaderSVG} alt="loader" />
    </div>
  );
};
