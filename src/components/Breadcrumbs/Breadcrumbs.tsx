import React, { useContext } from 'react';
import cn from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { BackLink } from '../BackLink';
import { ThemeContext } from '../../store/ThemeContex';
import { Theme } from '../../types/Theme';
import home from '../../images/icons/home.svg';
import homeDark from '../../images/icons/home_for_dark.svg';
import arrow from '../../images/icons/arrow_right_dis.png';
import arrowDark from '../../images/icons/arrow_right_for_dark.svg';

type Props = {
  gadget?: ProductDetails | null;
};

export const Breadcrumbs: React.FC<Props> = ({ gadget }) => {
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const nameOfPath = pathname.slice(1).split('/')[0];
  const capitalizedPath =
    nameOfPath.charAt(0).toUpperCase() + nameOfPath.slice(1);
  const { itemId } = useParams();

  return (
    <section className={styles.breadcrumbs}>
      <div className={styles.breadcrumbs__container}>
        <Link to="/" className={styles.breadcrumbs__link}>
          <img
            src={theme === Theme.Light ? home : homeDark}
            alt="home"
            className={styles.breadcrumbs__image}
          />
        </Link>

        <div className={styles.breadcrumbs__arrow}>
          <img
            src={theme === Theme.Light ? arrow : arrowDark}
            alt="arrow"
            className={styles.breadcrumbs__img}
          />
        </div>

        <p
          className={cn(styles.breadcrumbs__path, {
            [styles['breadcrumbs__path--active']]: itemId,
            [styles['breadcrumbs__path--dark']]: theme === Theme.Dark,
            [styles['breadcrumbs__path--dark--active']]:
              itemId && theme === Theme.Dark,
          })}
        >
          {capitalizedPath}
        </p>

        {itemId && gadget && (
          <>
            <div className={styles.breadcrumbs__arrow}>
              <img
                src={theme === Theme.Light ? arrow : arrowDark}
                alt="arrow"
                className={styles.breadcrumbs__img}
              />
            </div>

            <div className={styles.breadcrumbs__path}>{gadget.name}</div>
          </>
        )}
      </div>

      {itemId && gadget && <BackLink />}
    </section>
  );
};
