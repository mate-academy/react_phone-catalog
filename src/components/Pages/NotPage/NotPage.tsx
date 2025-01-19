import React, { useEffect } from 'react';
import { PathToPage } from '../../PartToPage/PathToPage';
import './NotPage.scss';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export const NotPage = () => {
  const [searchParams] = useSearchParams();
  const { t, i18n } = useTranslation();
  const currentLanguage = searchParams.get('lang') || 'en';

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  return (
    <div className="not-page">
      <PathToPage arrayPath={[t('notPage')]} />
      <h1 className="title">{t('notPage')}</h1>
    </div>
  );
};
