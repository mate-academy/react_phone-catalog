/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useTranslation } from 'react-i18next';
import styles from './ErrorMessage.module.scss';
//#endregion IMPORTS

//#region STYLES
const { errorBlock, errorText, reloadBtn } = styles;
//#endregion STYLES

interface Props {
  message?: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  //#region HOOKS
  const { t } = useTranslation();
  //#endregion

  //#region HANDLERS_&_HELPERS
  const handleReload = () => {
    window.location.reload();
  };

  const displayMessage = message || t('errorMessage.default');
  //#endregion HANDLERS_&_HELPERS

  //#region RENDER
  return (
    <div className={errorBlock}>
      <p className={errorText}>{displayMessage}</p>

      <button
        type="button"
        className={reloadBtn}
        onClick={handleReload}
      >
        {t('errorMessage.tryAgain')}
      </button>
    </div>
  );
  //#endregion RENDER
};
