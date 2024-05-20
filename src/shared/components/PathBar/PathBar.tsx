import styles from './PathBar.module.scss';
import homeIcon from './icons/homeIcon.svg';
import whiteHome from './icons/whiteHome.svg';
import { Link } from 'react-router-dom';
import arrow from './icons/arrow.svg';
import classNames from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../../utils/AppContext';

type Props = {
  category: string;
  productName?: string;
};

export const PathBar: React.FC<Props> = ({ category, productName }) => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <div className={styles.pathBar}>
      <Link
        to="/"
        className={styles.pathBar__icons}
        style={
          isDarkTheme
            ? { background: `url(${whiteHome})` }
            : { background: `url(${homeIcon})` }
        }
      ></Link>
      <div
        className={styles.pathBar__icons}
        style={{ background: `url(${arrow})` }}
      ></div>
      {productName ? (
        <>
          <Link
            to={`/${category}`}
            className={classNames(
              styles.pathBar__current,
              styles.pathBar__link,
              isDarkTheme ? styles.pathBar__currentDark : '',
              isDarkTheme ? styles.pathBar__linkDark : '',
            )}
          >
            {category}
          </Link>

          <div
            className={styles.pathBar__icons}
            style={{ background: `url(${arrow})` }}
          ></div>

          <span
            className={classNames(
              styles.pathBar__current,
              isDarkTheme ? styles.pathBar__currentDark : '',
            )}
          >
            {productName}
          </span>
        </>
      ) : (
        <span
          className={classNames(
            styles.pathBar__current,
            isDarkTheme ? styles.pathBar__currentDark : '',
          )}
        >
          {category}
        </span>
      )}
    </div>
  );
};
