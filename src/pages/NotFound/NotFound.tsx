import { Link } from 'react-router-dom';

import { useLanguage } from '../../context/LanguageContext';

export const NotFound = () => {
  const { t } = useLanguage();

  return (
    <section>
      <h1>{t('pageNotFound')}</h1>

      <Link to="/">{t('goToHome')}</Link>
    </section>
  );
};
