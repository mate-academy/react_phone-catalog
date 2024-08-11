import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './BreadCrumbs.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export interface CrumbsType {
  pathname: string;
}

export const BreadCrumbs: React.FC<CrumbsType> = ({ pathname }) => {
  const refMain = useRef<HTMLDivElement>(null);

  const [lastLinkStyles, setLastLinkStyles] = useState({});

  const getFormedPath = () => {
    const paths = pathname.split('/').filter(pItem => pItem);

    return paths;
  };

  const getRightPathname = useCallback((path: string) => {
    const letters = path.split('');

    let result = '';

    for (let i = 0; i < letters.length; i++) {
      if (i === 0) {
        result += letters[i].toUpperCase();
      } else {
        result += letters[i].toLowerCase();
      }
    }

    return result;
  }, []);

  const checkOverflow = () => {
    if (refMain.current) {
      const children = [];

      for (let i = 0; i < refMain.current.children.length - 1; i++) {
        children.push(refMain.current.children[i]);
      }

      const customStyles = {
        maxWidth: `${refMain.current.clientWidth - 48 - children.reduce((prev, current) => prev + current.clientWidth, 0)}px`,
      };

      setLastLinkStyles(customStyles);
    }
  };

  useEffect(() => {
    checkOverflow();

    window.addEventListener('resize', () => checkOverflow());

    return () => {
      window.removeEventListener('resize', () => checkOverflow());
    };
  }, []);

  return (
    <div className={styles.breadcrumbs} ref={refMain}>
      <Link to={'/'} className={styles['breadcrumbs__home-icon']}>
        <div className={styles['breadcrumbs__home-wrapper']}>
          <div className={styles['breadcrumbs__home-image']}></div>
        </div>
      </Link>

      {getFormedPath().map((path, ind, arr) => {
        const previous = arr.slice(0, ind - 1);

        const formedPath = previous.reduce(
          (prev, curr) => prev + '/' + curr,
          '',
        );

        return (
          <div key={path} className={styles.breadcrumbs__path}>
            <span className={styles.breadcrumbs__arrow}></span>

            <Link
              to={formedPath}
              className={classNames(styles.breadcrumbs__link, {
                [styles['breadcrumbs__link--active']]: ind === arr.length - 1,
              })}
              style={lastLinkStyles}
            >
              {getRightPathname(path)}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
