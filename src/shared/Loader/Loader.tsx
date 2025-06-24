import { useContext } from 'react';
// import logoDark from '../../images/logo_dark.svg';
// import logo from '../../images/logo.svg';

import './Loader.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { Icon } from '../Icon';
import { icons } from '../../constants/icons';

export const Loader: React.FC = () => {
  const { theme } = useContext(GlobalContext);

  return (
    <div className="loader">
      {/* <img
    src={theme === 'light' ? logo : logoDark}
    alt="Logo"
    className="loader__image"
  />*/}
      <Icon icon={icons.logo[theme]} />
      <div className="loader__content" />
    </div>
  );
};
