import React from 'react';
import { useTranslation } from 'react-i18next';

export const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">{t('not-found-page')}</h1>
      <img
        src="./img/page-not-found.png"
        alt="not-found-page"
        className="not-found-page__image"
      />
    </div>
  );
};
