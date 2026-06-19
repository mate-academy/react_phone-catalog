/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import arrowLeft from '@/assets/svg/arrow-left.svg';

import styles from './BackButton.module.scss';
//#endregion IMPORTS

//#region STYLES
const {
  backButton,
  backButtonBtn,
  backButtonIcon,
  backButtonText,
} = styles;
//#endregion STYLES

export const BackButton = () => {
  //#region STATE_&_HOOKS
  const { t } = useTranslation();
  const navigate = useNavigate();
  //#endregion STATE_&_HOOKS

  //#region HANDLERS_&_HELPERS
  const navigateBack = () => navigate(-1);
  //#endregion HANDLERS_&_HELPERS

  //#region RENDER
  return (
    <div className={backButton}>
      <button className={backButtonBtn} type="button" onClick={navigateBack}>
        <div className={backButtonIcon} aria-hidden="true">
          <img src={arrowLeft}/>
        </div>
        <span className={backButtonText}>{t('backButton.text')}</span>
      </button>
    </div>
  );
  //#endregion RENDER
};
