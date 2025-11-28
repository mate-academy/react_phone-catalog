import { Link } from 'react-router-dom';
import styles from './HomeBtn.module.scss';
import homeIcon from '/icons/home-icon.png';
import arrowRight from '/icons/arrow-right-icon.png';

export const HomeBtn = () => {
  return (
    <Link to="/home">
      <button className={styles.home_btn}>
        <img src={homeIcon} alt="homeIcon" />
        <img src={arrowRight} alt="arrowRight" />
      </button>
    </Link>
  );
};
