import './NotFoundPage.scss';
import notPage from '../../images/page-not-found copy.png';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { theme } = useAppSelector(state => state.theme);

  const { t } = useTranslation();

  return (
    <div className="notFoundPage">
      <div className="notFoundPage__content">
        <div className="notFoundPage__back">
          <img
            src={theme === 'light-theme' ? arrow : arrowDark}
            alt="Arrow"
            className="notFoundPage__back-arrow"
          />
          <Link to="/" className="notFoundPage__back-link">
            {t('notFoundPage.backToHome')}
          </Link>
        </div>

        <h1 className="notFoundPage__title">{t('notFoundPage.title')}</h1>
        <img src={notPage} alt="NotFoundPage" className="notFoundPage__img" />
      </div>
    </div>
  );
};
