import React, { useContext } from 'react';
import styles from './BackButton.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export const BackButton: React.FC = () => {
  const { theme } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Link to="#" onClick={handleGoBack} style={{ textDecoration: 'none' }}>
      <div className={styles.backButton}>
        <i
          className={classNames(styles.arrow, {
            [styles.dark]: theme === 'dark',
          })}
        ></i>
        <h3 className={styles.text}>{t('back')}</h3>
      </div>
    </Link>
  );
};
