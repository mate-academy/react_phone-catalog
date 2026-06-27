import styles from './BackButton.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <button
        className={styles.backButton}
        aria-label={t('cart.back')}
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          }
        }}
      >
        <img src="./img/icons/left.svg" alt="" className={styles.back} />
        {t('cart.back')}
      </button>
    </div>
  );
};
