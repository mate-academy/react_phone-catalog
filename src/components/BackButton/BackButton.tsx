import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { useTranslation } from 'react-i18next';

export const BackButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      &#8592; {t('back')}
    </button>
  );
};
