import { ButtonHTMLAttributes, useContext } from 'react';
import { LanguageContext } from '../../store/LanguageProvider';
import style from './LangButton.module.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const LangButton: React.FC<Props> = () => {
  const { setCurrentLanguage, changeLanguage, language, currentLanguage } =
    useContext(LanguageContext);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ua' : 'en';

    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <button
      type="button"
      onClick={handleChangeLanguage}
      className={style.language__button}
    >
      {language.toUpperCase()}
    </button>
  );
};
