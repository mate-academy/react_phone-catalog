import styles from './BreadCrumbs.module.scss';
import homeLight from '../../images/icon-home-light-theme.svg';
import homeDark from '../../images/icon-home-dark-theme.svg';
import arrowLight from '../../images/icon-right-light-theme.svg';
import arrowDark from '../../images/icon-right-dark-theme.svg';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const { theme } = useAppSelector(state => state.theme);
  const { t } = useTranslation();
  const pathParts = pathname.slice(1).split('/');
  const categoryName = pathParts[0];
  const productName = pathParts[1]
    ?.replace(/[-:]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  function capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }

  function translate(category: string) {
    switch (category) {
      case 'phones':
        return capitalize(t('breadCrumbs.phones'));
      case 'tablets':
        return capitalize(t('breadCrumbs.tablets'));
      case 'accessories':
        return capitalize(t('breadCrumbs.accessories'));
      case 'favorites':
        return capitalize(t('breadCrumbs.favorites'));
      default:
        return;
    }
  }

  return (
    <div className={styles.breadCrumbs}>
      <div className={styles.breadCrumbs__content}>
        <div className={styles.breadCrumbs__logo}>
          <Link to="/" className={styles.breadCrumbs__logo__link}>
            <img
              src={theme === 'light' ? homeLight : homeDark}
              alt="Icon Home"
              className={styles.breadCrumbs__logo__link__img}
            />
          </Link>
        </div>

        <span className={styles.breadCrumbs____arrowRight}>
          <img
            src={theme === 'light' ? arrowLight : arrowDark}
            alt="Arrow Right"
            className={styles.breadCrumbs__arrowRight__icon}
          />
        </span>

        {!productName ? (
          <p className={styles.breadCrumbs__title}>{translate(categoryName)}</p>
        ) : (
          <>
            <Link
              to={`/${categoryName}`}
              className={classNames(styles.breadCrumbs__title, {
                [styles.breadCrumbs__title__active]: productName,
              })}
            >
              {translate(categoryName)}
            </Link>

            <span className={styles.breadCrumbs__arrowRight}>
              <img
                src={theme === 'light' ? arrowLight : arrowDark}
                alt="Arrow Right"
                className={styles.breadCrumbs__arrowRight__icon}
              />
            </span>

            <p className={styles.breadCrumbs__title}>
              {capitalize(productName)}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
