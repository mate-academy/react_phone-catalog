import styles from './Breadcrumbs.module.scss';

import homeIcon from '../../../public/img/icons/Home.svg';
import rightArrow from '../../../public/img/icons/arrows/arrow-right-icon.svg';
import { Link, useLocation } from 'react-router-dom';

type Props = {};

const Breadcrumbs: React.FC<Props> = () => {
  const { pathname } = useLocation();

  const clearPath = pathname.slice(1, pathname.length);

  const path =
    clearPath.charAt(0).toUpperCase() + clearPath.slice(1, clearPath.length);

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/home" className={styles.breadcrumbs__home}>
        <img src={homeIcon} alt="home icon" />
      </Link>
      <img
        className={styles.breadcrumbs__arrow}
        src={rightArrow}
        alt="right arrow"
      />
      {/* <Link to="/home"> */}
      <p className={styles.breadcrumbs__pathname}>{path}</p>
      {/* </Link> */}
    </div>
  );
};

export default Breadcrumbs;
