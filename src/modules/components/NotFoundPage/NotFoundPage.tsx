/* eslint-disable prettier/prettier */

//#region IMPORTS
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './NotFoundPage.module.scss';
//#endregion

//#region STYLES
const {
  container,
  title,
  subtitle,
  linkButton,
} = styles;
//#endregion

export const NotFoundPage = () => {
  //#region HOOKS
  const { t } = useTranslation();
  //#endregion

  //#region RENDER
  return (
    <div className={container}>
      <h1 className={title}>{t('notFoundPage.title')}</h1>
      <p className={subtitle}>{t('notFoundPage.subtitle')} </p>

      <Link to="/" className={linkButton}>
        {t('notFoundPage.goHome')}
      </Link>
    </div>
  );
  //#endregion
};
