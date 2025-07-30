import { useTranslationState } from '../../stateManagers/languageState';
import { useThemeState } from '../../stateManagers/themeState';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss';

export const NotFoundPage = () => {
  const { translate } = useTranslationState();
  const { theme } = useThemeState();
  const navigate = useNavigate();

  return (
    <section className={`notFoundPage notFoundPage--${theme}`}>
      <h1 className="notFoundPage__title">
        {translate('Oops! Page not found.')}
      </h1>
      <p className="notFoundPage__desc">
        {translate('Looks like this page doesn’t exist anymore')}
      </p>
      <button
        className="notFoundPage__button"
        onClick={() => navigate('/')}
      >
        {translate('Back to Home')}
      </button>
    </section>
  );
};
