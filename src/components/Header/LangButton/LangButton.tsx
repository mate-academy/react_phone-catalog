import { useContext } from 'react';
import { LanguageContext } from '../../../store/LanguageProvider';
import style from './LangButton.module.scss';

export const LangButton = () => {
  const { setCurrentLanguage, changeLanguage, language, currentLanguage } =
    useContext(LanguageContext);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ua' : 'en';

    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <div className={style.language}>
      <button
        type="button"
        onClick={handleChangeLanguage}
        className={style.language__button}
      >
        {language.toUpperCase()}
      </button>
    </div>
  );
};
