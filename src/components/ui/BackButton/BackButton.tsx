import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft } from 'lucide-react';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleGoBack} className={styles.backButton}>
      <ChevronLeft size={16} className={styles.icon} />
      <span className={styles.text}>{t('btn.backArr', 'Back')}</span>
    </button>
  );
};
