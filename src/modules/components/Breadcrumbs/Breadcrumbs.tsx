import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import homeIcon from '../../../img/icons/Home.svg';
import shevronRight from '../../../img/icons/Chevron (Arrow Right).svg';

type Crumb = {
  label: string;
  to?: string;
};

type Props = {
  items: Crumb[];
};

const HomeIcon = () => <img src={homeIcon} alt="Home" />;
const ChevronIcon = () => <img src={shevronRight} alt="" />;

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.homeLink} aria-label="Home">
            <HomeIcon />
          </Link>
        </li>

        {items.map(crumb => (
          <li key={crumb.label} className={styles.item}>
            <ChevronIcon />
            {crumb.to ? (
              <Link to={crumb.to} className={styles.link}>
                {crumb.label}
              </Link>
            ) : (
              <span className={styles.current}>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
