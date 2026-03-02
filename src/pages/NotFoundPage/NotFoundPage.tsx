import { useTranslation } from 'react-i18next';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="notFound">
      <h1 className="title">{t('not_found_page.title')}</h1>
      <h2 className="title__message">{t('not_found_page.message')}</h2>
    </div>
  );
};
