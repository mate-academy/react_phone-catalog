import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="LanguageSwitcher">
      <button
        type="button"
        className={`${i18n.language === 'en' ? 'LanguageSwitcher__button--active' : 'LanguageSwitcher__button'}`}
        onClick={() => handleLanguageChange('en')}
      >
        ENG
      </button>

      <hr />
      <button
        type="button"
        className={`${i18n.language === 'ua' ? 'LanguageSwitcher__button--active' : 'LanguageSwitcher__button'}`}
        onClick={() => handleLanguageChange('ua')}
      >
        УКР
      </button>
    </div>
  );
};
