import { useContext } from 'react';
import logoDark from '../../../../public/logo_dark.svg';
import logo from '../../../../public/logo.svg';

import './Loader.scss';
import { GlobalContext } from '../../../context/GlobalContext';

export const Loader: React.FC = () => {
  const { theme } = useContext(GlobalContext);

  return (
    <div className="loader">
      <img
        src={theme === 'light' ? logo : logoDark}
        alt="Logo"
        className="loader__image"
      />
    </div>
  );
};
