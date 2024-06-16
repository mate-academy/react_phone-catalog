import { useContext } from 'react';
import { IsActiveMenuContext } from '../../context/IsActiveMenuContext';

export const HeaderMenuButtons = () => {
  const { setIsActiveMenu } = useContext(IsActiveMenuContext);

  return (
    <div className="header__buttons">
      <div
        onClick={() => setIsActiveMenu(false)}
        className="header__button header__button-close"
      ></div>
    </div>
  );
};
