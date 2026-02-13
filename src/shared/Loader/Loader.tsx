import { useContext } from 'react';

import './Loader.scss';
import { GlobalContext } from '../../context/GlobalContext';
import { Icon } from '../Icon';
import { icons } from '../../constants/icons';

export const Loader: React.FC = () => {
  const { theme } = useContext(GlobalContext);

  return (
    <>
      <div className="loader">
        <Icon icon={icons.logo[theme]} />
        <div className="loader__content" />
      </div>
    </>
  );
};
