import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import iconStyles from '../../styles/icons.module.scss';
import btnStyles from '../../styles/buttons.module.scss';

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
      className={`${btnStyles.block} ${btnStyles.back}`}
      onClick={() => navigateTo()}
      aria-label={t(TRANSLATIONS.back.ariaLabel)}
    >
      <span
        className={`${iconStyles.block} ${iconStyles.arrowLeft} ${iconStyles.arrowLeft_m_back}`}
      ></span>
      <span className={btnStyles.back__text}>{t(TRANSLATIONS.back.text)}</span>
    </div>
  );
};
