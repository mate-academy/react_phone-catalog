/* eslint-disable max-len */
import { Link, useLocation } from 'react-router-dom';
import styles from './Back.module.scss';
import { useTranslation } from 'react-i18next';

type BackParameters = {
  pathname: string;
  search?: string;
};

export const Back = () => {
  const { state } = useLocation();
  const { t } = useTranslation();

  const linkParameter: BackParameters = { pathname: '/' };

  if (state && state.pathname) {
    linkParameter.pathname = state.pathname;
  }

  if (state && state.preserveFromSearch) {
    linkParameter.search = state.search;
  }

  return (
    <Link to={linkParameter} className={styles.back}>
      <span className="icon icon--chevron-active icon--rotate-180" />
      <span className={styles.back__text}>{t('back')}</span>
    </Link>
  );
};
