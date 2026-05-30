import { useNavigate } from 'react-router-dom';
import styles from './BackButton.module.scss';
import { useTranslation } from 'react-i18next';

export const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div onClick={() => navigate(-1)} className={styles.Page__backButton}>
      <img src="./img/buttons/left-arrow.svg" alt="arrow-left" />
      <span className={styles['Page__header__backButton-text']}>
        {t('back.back')}
      </span>
    </div>
  );
};
