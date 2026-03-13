import { imageUrl } from '../../../utils/imageUrl';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  return (
    <div className={styles.breadcrumbs}>
      <img
        src={imageUrl('icons/Home.svg')}
        alt="home-icon"
        className={styles.home}
      />
      {/* <div className={styles.group}> */}
      <span className={styles.arrow}></span>
      <p className={styles.path}>Phones</p>
      {/* </div> */}
    </div>
  );
};
