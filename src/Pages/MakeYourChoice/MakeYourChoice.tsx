import { Link, Outlet, useLocation } from 'react-router-dom';
import { useThemeState } from '../../stateManagers/themeState';
import { useTranslationState } from '../../stateManagers/languageState';
import '../MakeYourChoice/MakeYourChoice.scss';

export const MakeYourChoice = () => {
  const { theme } = useThemeState();
  const { translate } = useTranslationState();
  const location = useLocation();

  const isOnHelpPage = location.pathname.endsWith('/help-defenders');

  if (isOnHelpPage) {
    return <Outlet />;
  }

  return (
    <section className={`make-your-choice make-your-choice--${theme}`}>
      <div
        className={`make-your-choice__content make-your-choice__content--${theme}`}
      >
        <p className="make-your-choice__message">
          {translate(
            "Sorry, unfortunately we can't sell you the product right now, but we can offer to help our defenders.",
          )}
        </p>
        <div className="make-your-choice__buttons">
          <Link
            to="../"
            className="make-your-choice__button--back"
          >
            {translate('Back to Store')}
          </Link>
          <Link
            to="help-defenders"
            className="make-your-choice__button--help"
          >
            {translate('Help')}
          </Link>
        </div>
      </div>
    </section>
  );
};
