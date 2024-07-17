import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/i18n/translations';

export const Back = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const navigateTo = () => {
    if (location.key === 'default') {
      return navigate('..');
    }

    return navigate(-1);
  };

  return (
    <div
      className="btn btn--back"
      onClick={() => navigateTo()}
      aria-label={t(TRANSLATIONS.back.ariaLabel)}
    >
      <span className="icon icon--arrow-left"></span>
      <span className="btn--back-text">{t(TRANSLATIONS.back.text)}</span>
    </div>
  );
};
