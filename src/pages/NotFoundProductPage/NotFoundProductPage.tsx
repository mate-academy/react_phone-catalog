import './NotFoundProductPage.scss';
import notProduct from '../../images/product-not-found copy.png';
import arrow from '../../images/icons/arrow_right.png';
import arrowDark from '../../images/icons/arrow_dark.svg';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useTranslation } from 'react-i18next';
import React from 'react';

type Props = {
  title: string;
};

export const NotFoundProductPage: React.FC<Props> = React.memo(({ title }) => {
  const { theme } = useAppSelector(state => state.theme);

  const { t } = useTranslation();

  return (
    <div className="notFoundProductPage">
      <div className="notFoundProductPage__content">
        <div className="notFoundProductPage__back">
          <img
            src={theme === 'light-theme' ? arrow : arrowDark}
            alt="Arrow"
            className="notFoundProductPage__back-arrow"
          />
          <Link to="/" className="notFoundProductPage__back-link">
            {t('notFoundPage.backToHome')}
          </Link>
        </div>

        <h1 className="notFoundProductPage__title">{title}</h1>
        <img
          src={notProduct}
          alt="notFoundProductPage"
          className="notFoundProductPage__img"
        />
      </div>
    </div>
  );
});

NotFoundProductPage.displayName = 'NotFoundProductPage';
