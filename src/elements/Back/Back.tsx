/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import styles from './Back.module.scss';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export const Back = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <button onClick={handleBack} className={classNames('button', styles.back)}>
      <span className="icon icon--chevron-active icon--rotate-180" />
      <span className={styles.back__text}>{t('back')}</span>
    </button>
  );
};
