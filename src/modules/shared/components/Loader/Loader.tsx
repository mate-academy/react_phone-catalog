/* eslint-disable prettier/prettier */

//#region IMPORTS
import styles from './Loader.module.scss';
//#endregion IMPORTS

//#region STYLES
const { loaderContainer, spinner } = styles;
//#endregion STYLES

export const Loader = () => {
  //#region RENDER
  return (
    <div className={loaderContainer}>
      <div className={spinner} />
    </div>
  );
  //#endregion RENDER
};
