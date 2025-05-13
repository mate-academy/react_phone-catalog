import { Link } from 'react-router-dom';
import { ArrowIconRight } from '../ArrowIcon/ArrowIcon';
import { capitalize } from '../CategoryPage/CategoryPage';
import styles from './Breadcrumbs.module.scss';
import { Accessorie } from '../../../../types/accessorie';

type Props = {
  item: Accessorie | null;
  type: string;
};

const Breadcrumbs: React.FC<Props> = ({ item, type }) => {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/">
        <img
          className={styles.breadcrumbs__icon}
          src="public/img/icons/Home.svg"
          alt="Home Icon"
        />
      </Link>
      <ArrowIconRight />
      <Link to={`/${type}`} className={styles.breadcrumbs__link}>
        {capitalize(type)}
      </Link>
      <ArrowIconRight />
      <p className={styles.breadcrumbs__title}>{item?.name}</p>
    </div>
  );
};

export default Breadcrumbs;
