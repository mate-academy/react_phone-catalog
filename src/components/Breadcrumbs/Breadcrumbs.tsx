import styles from './Breadcrumbs.module.scss';

import { Link } from 'react-router-dom';
import homeIcon from '../../assets/icons/home.svg';
import chevron from '../../assets/icons/chevron-right.svg';

type Props = {
  items: {
    label: string;
    path?: string;
  }[];
};

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.link}>
        <img src={homeIcon} alt="Home" className={styles.icon} />
      </Link>

      {items.map((item, index) => (
        <span key={index} className={styles.item}>
          <span className={styles.separator}>
            <img src={chevron} alt="chevron" className={styles.icon} />
          </span>
          {item.path ? (
            <Link to={item.path} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
