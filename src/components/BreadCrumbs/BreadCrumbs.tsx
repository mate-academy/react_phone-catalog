import './BreadCrumbs.scss';
import home from '../../images/icons/icon_home.png';
import homeDark from '../../images/icons/home_dark.svg';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();
  const { theme } = useAppSelector(state => state.theme);
  const { t } = useTranslation();
  const productName = pathname.slice(1).split('/')[1];
  const categoryName = pathname.slice(1).split('/')[0];

  function capitalize(word: string) {
    return word[0].toUpperCase() + word.slice(1);
  }

  function translate(category: string) {
    switch (category) {
      case 'phones':
        return t('breadCrumbs.phones');

      case 'tablets':
        return t('breadCrumbs.tablets');

      case 'accessories':
        return t('breadCrumbs.accessories');

      case 'favourites':
        return t('breadCrumbs.favourites');

      default:
        return;
    }
  }

  return (
    <div className="breadCrumbs">
      <div className="breadCrumbs__contant">
        <div className="breadCrumbs__logo">
          <Link to="/" className="breadCrumbs__logo-link">
            <img
              src={theme === 'light-theme' ? home : homeDark}
              alt="IconHome"
              className="breadCrumbs__logo-img"
            />
          </Link>
        </div>

        <span className="breadCrumbs__arrow">
          <img
            src={theme === 'light-theme' ? arrow : arrowDark}
            alt="Arrow"
            className="breadCrumbs__arrow-img"
          />
        </span>

        {!productName ? (
          <p className="breadCrumbs__title">{translate(categoryName)}</p>
        ) : (
          <>
            <Link
              to={`/${categoryName}`}
              className={classNames('breadCrumbs__title', {
                'breadCrumbs__title-active': productName,
              })}
            >
              {translate(categoryName)}
            </Link>

            <span className="breadCrumbs__arrow">
              <img
                src={theme === 'light-theme' ? arrow : arrowDark}
                alt="Arrow"
                className="breadCrumbs__arrow-img"
              />
            </span>

            <p className="breadCrumbs__title">
              {capitalize(productName.slice(1))}
            </p>
          </>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};
