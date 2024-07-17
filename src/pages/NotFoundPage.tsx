import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../utils/i18n/translations';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="hero-title">{t(TRANSLATIONS.error.notFound.title)}</h1>
      <section className="not-found">
        <div className="not-found__bg not-found__bg--page"></div>
      </section>
    </>
  );
};
