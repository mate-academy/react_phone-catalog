/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.scss';
//#endregion

//#region STYLES
const { langSwitcher, langBtn, langBtnActive } = styles;
//#endregion

export const LanguageSwitcher = () => {
  //#region HOOKS
  const { i18n } = useTranslation();
  //#endregion

  //#region HANDLERS
  const toggleLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  //#endregion

  //#region RENDER
  return (
    <div className={langSwitcher}>
      <button
        type="button"
        onClick={() => toggleLanguage('en')}
        className={`
          ${langBtn}
          ${i18n.language.startsWith('en') ? langBtnActive : ''}
        `}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => toggleLanguage('uk')}
        className={`
          ${langBtn}
          ${i18n.language.startsWith('uk') ? langBtnActive : ''}
        `}
      >
        UA
      </button>
    </div>
  );
  //#endregion
};
