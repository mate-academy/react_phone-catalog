import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import homeImage from '../../items/Home.png';
import arrowRight from '../../items/vector_right_black.png';

type Props = {
  category: string;
  categoryPath: string;
  productName: string;
};

export const Breadcrumbs = ({ category, categoryPath, productName }: Props) => (
  <nav className={styles.breadcrumbs}>
    <Link to="/">
      <img className={styles.home_icon} src={homeImage} alt="home" />
    </Link>
    <img className={styles.separator} src={arrowRight} alt="" />
    <Link to={categoryPath} className={styles.link}>
      {category}
    </Link>
    <img className={styles.separator} src={arrowRight} alt="" />
    <span className={styles.current}>{productName}</span>
  </nav>
);
