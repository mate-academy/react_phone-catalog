/* eslint-disable prettier/prettier */

//#region IMPORTS
import styles from './ErrorMessage.module.scss';
//#endregion IMPORTS

//#region STYLES
const { errorBlock, errorText, reloadBtn } = styles;
//#endregion STYLES

interface Props {
  message?: string;
}

export const ErrorMessage: React.FC<Props> = ({
  message = 'Something went wrong. Please try again later.',
}) => {
  //#region HANDLERS_&_HELPERS
  const handleReload = () => {
    window.location.reload();
  };
  //#endregion HANDLERS_&_HELPERS

  //#region RENDER
  return (
    <div className={errorBlock}>
      <p className={errorText}>{message}</p>

      <button type="button" className={reloadBtn} onClick={handleReload}>
        Try again
      </button>
    </div>
  );
  //#endregion RENDER
};
