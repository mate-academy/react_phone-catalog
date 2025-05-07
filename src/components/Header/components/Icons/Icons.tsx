import { useLocation } from 'react-router-dom';
import { NavIcons } from '../../../NavIcons';
import { Search } from './components/Search/Search';
import { useWidth } from '../../../../hooks/useWidth';
import styles from './Icons.module.scss';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from '../../../../store/MenuContext';

export const Icons = () => {
  const width = useWidth();
  const { pathname: path } = useLocation();
  const { displayMenu, setDisplayMenu } = useContext(MenuContext);
  const displaySearch = ['/phones', '/tablets', '/accessories'].includes(path);
  const getBarClass = (order: number) =>
    classNames(`${styles.bar} ${styles[`bar__${order}`]}`, {
      [styles[`bar__${order}__selected`]]: displayMenu,
    });

  return (
    <div className={styles.icons}>
      {displaySearch && <Search />}
      {((displaySearch && width > 800) || !displaySearch) && (
        <div className={styles.icon1}>
          <ThemeSwitcher />
        </div>
      )}
      {width < 640 ? (
        <div
          className={styles.icon1}
          onClick={() => setDisplayMenu(prev => !prev)}
        >
          <a
            className={classNames(`${styles.hamburger}`, {
              [styles.hamburger__selected]: displayMenu,
            })}
          >
            {Array.from(Array(4).keys()).map((__el, index) => (
              <span key={index} className={getBarClass(index)}></span>
            ))}
          </a>
        </div>
      ) : (
        <NavIcons />
      )}
    </div>
  );
};
