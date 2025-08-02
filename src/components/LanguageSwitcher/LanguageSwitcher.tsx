// LanguageSwitcher.jsx
import './LanguageSwitcher.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../redux/languageSlice';
import { useAppSelector } from '../../redux/store';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const currentLanguage = useAppSelector(
    (state: { language: { current: string; }; }) => state.language.current);

  useEffect(() => {
    // Synchronize i18n with redux state when component mounts
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  const changeLanguage = (language: string | undefined) => {
    i18n.changeLanguage(language);
    dispatch(setLanguage(language));
  };

  return (
    <div className="language-switcher">
      {t('languageSelector')}
      <div className="language-buttons">
        <button
          onClick={() => changeLanguage('en')}
          className={currentLanguage === 'en' ? 'active' : ''}
        >
          English
        </button>
        <button
          onClick={() => changeLanguage('uk')}
          className={currentLanguage === 'uk' ? 'active' : ''}
        >
          Українська
        </button>
        <button
          onClick={() => changeLanguage('de')}
          className={currentLanguage === 'de' ? 'active' : ''}
        >
          Deutsch
        </button>
        <button
          onClick={() => changeLanguage('fr')}
          className={currentLanguage === 'fr' ? 'active' : ''}
        >
          Français
        </button>
        <button
          onClick={() => changeLanguage('es')}
          className={currentLanguage === 'es' ? 'active' : ''}
        >
          Español
        </button>
        <button
          onClick={() => changeLanguage('it')}
          className={currentLanguage === 'it' ? 'active' : ''}
        >
          Italiano
        </button>
        <button
          onClick={() => changeLanguage('cz')}
          className={currentLanguage === 'cz' ? 'active' : ''}
        >
          Čeština
        </button>
        <button
          onClick={() => changeLanguage('cn')}
          className={currentLanguage === 'cn' ? 'active' : ''}
        >
          中文
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
