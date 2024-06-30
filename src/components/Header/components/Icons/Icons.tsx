/* eslint-disable jsx-a11y/label-has-associated-control */
import { useLocation, useNavigate } from 'react-router-dom';
import { NavIcons } from '../../../NavIcons';
import { Search } from './components/Search/Search';
import { useWidth } from '../../../../hooks/useWidth';
import styles from './Icons.module.scss';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useMemo } from 'react';
import classNames from 'classnames';

export const Icons = () => {
  const width = useWidth();
  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  const displayMenu = useMemo(() => path.includes('menu'), [path]);
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
          onClick={() => {
            navigate(!displayMenu ? '/menu' : '../');
          }}
        >
          <div
            className={classNames(`${styles.hamburger}`, {
              [styles.hamburger__selected]: displayMenu,
            })}
          >
            {Array.from(Array(4).keys()).map((__el, index) => (
              <span key={index} className={getBarClass(index)}></span>
            ))}
          </div>
        </div>
      ) : (
        <NavIcons />
      )}
    </div>
  );
};
