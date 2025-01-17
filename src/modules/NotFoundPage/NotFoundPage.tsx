import styles from './NotFoundPage.module.scss';
import NotFoundPageImg from '../../images/page-not-found.png';
import { useTranslation } from 'react-i18next';
import { GoBackButton } from '../../components/GoBackButton';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onGoBackHome = () => {
    navigate('/');
  };

  return (
    <div className={styles.notFoundPage} id="notFoundPage">
      <p className={styles.message}>{t('notFoundPage.message')}</p>
      <img
        src={NotFoundPageImg}
        alt="Page Not Found 404"
        className={styles.image}
      />
      <h1 className={styles.title}>{t('notFoundPage.title')}</h1>

      <GoBackButton
        onClick={onGoBackHome}
        title={t('notFoundPage.backHome')}
        link={'/'}
      />
    </div>
  );
};
