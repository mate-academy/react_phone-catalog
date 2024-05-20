import './App.scss';
import { useContext } from 'react';
import { CreateContext } from './components/UseCotext/ContextProvider';

export const App = () => {
  const { setCurrentLanguage, changeLanguage, language, currentLanguage, t } =
    useContext(CreateContext);

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ua' : 'en';

    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  };

  return (
    <div className="App">
      <h1>{t('productCatalog', { appName: 'App for Translations' })}</h1>
      <button type="button" onClick={handleChangeLanguage}>
        {language}
      </button>
    </div>
  );
};
