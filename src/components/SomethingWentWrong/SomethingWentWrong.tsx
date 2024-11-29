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
      <ResponsiveHeader>{'Something went wrong :('}</ResponsiveHeader>

      <button onClick={handleReload} className="error-page-button">
        Reload
      </button>

      <img src={notFoundPage} alt="Not Found Page" />
    </div>
  );
};
