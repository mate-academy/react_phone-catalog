import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavIcons } from '../../../NavIcons';
import { Search } from './components/Search/Search';
import { useWidth } from '../../../../hooks/useWidth';
import styles from './Icons.module.scss';
import { ThemeSwitcher } from './components/ThemeSwitcher';

export const Icons = () => {
  const width = useWidth();
  const navigate = useNavigate();

  const { pathname: path } = useLocation();
  const displaySearch = ['/phones', '/tablets', '/accessories'].includes(path);

  return (
    <div className={styles.icons}>
      {displaySearch && <Search />}
      {((displaySearch && width > 800) || !displaySearch) && (
        <div className={styles.icon1}>
          <ThemeSwitcher />
        </div>
      )}

      {width < 640 ? (
        <>
          {path.includes('menu') ? (
            <span className={styles.icon1} onClick={() => navigate(-1)}>
              <div className="icon icon--close"></div>
            </span>
          ) : (
            <Link to="/menu" className={styles.icon1}>
              <div className="icon icon--menu"></div>
            </Link>
          )}
        </>
      ) : (
        <NavIcons />
      )}
    </div>
  );
};
