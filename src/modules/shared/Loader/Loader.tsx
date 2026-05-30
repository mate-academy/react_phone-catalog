import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import logoDark from '../../../../public/logo_dark.svg';
import logo from '../../../../public/logo.svg';
import './Loader.scss';

export const Loader: React.FC = () => {
  const { theme } = useContext(GlobalContext);
  const isLightTheme = theme === 'light';

  return (
    <div className="loader">
      <img
        src={isLightTheme ? logo : logoDark}
        alt="Application Logo"
        className="loader__image"
      />
    </div>
  );
};
