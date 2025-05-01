import { ResponsiveHeader } from '../ResponsiveHeader';
import themeStyles from '../../styles/utils/themeStyles';

import './SomethingWentWrong.scss';

export const SomethingWentWrong = () => {
  const { notFoundPage } = themeStyles(true);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="something-went-wrong">
      <div className="something-went-wrong__title">
        <ResponsiveHeader>{'Something went wrong :('}</ResponsiveHeader>
      </div>

      <button onClick={handleReload} className="error-page-button">
        Reload
      </button>

      <img className="image" src={notFoundPage} alt="Not Found Page" />
    </div>
  );
};
