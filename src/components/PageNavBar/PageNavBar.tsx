import { NavLink } from 'react-router-dom';
import styles from './PageNavBar.module.scss';
import home from '../../images/Icons/home.svg';
import arrow from '../../images/Icons/Arrow-Righ-Gray.png';
import classNames from 'classnames';

type Props = {
  title: string;
  category?: string;
  productName?: string;
};

export const PageNavBar: React.FC<Props> = ({
  title,
  category,
  productName,
}) => {
  return (
    <div className={styles.path}>
      <NavLink to="/home" className={styles.path__homeLink}>
        <img src={home} alt="" />
      </NavLink>
      <div className={styles.path__arrow}>
        <img src={arrow} alt="" />
      </div>
      <NavLink
        to={`/${category}`}
        className={classNames(`${styles.path__title}`, {
          [styles.path__titleWhite]: productName,
        })}
      >
        {title}
      </NavLink>
      {productName && (
        <>
          <div className={styles.path__arrow}>
            <img src={arrow} alt="" />
          </div>
          <p className={styles.path__name}>{productName}</p>
        </>
      )}
    </div>
  );
};
