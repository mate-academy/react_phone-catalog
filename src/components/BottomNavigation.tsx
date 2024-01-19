import { useContext } from 'react';
import { DropDownMenuContext } from '../helpers/context/DropDownMenuContext';

export const BottomNavigation = () => {
  const { collapseMenu } = useContext(DropDownMenuContext);

  return (
    <div className="bottom-navigation">
      <a
        className="bottom-navigation__link"
        // eslint-disable-next-line max-len
        href="https://github.com/AmadeuszAndroid/react_phone-catalog/tree/develop"
      >
        Github
      </a>

      <a
        className="bottom-navigation__link"
        href="#/"
        onClick={collapseMenu}
      >
        Contacts
      </a>

      <a
        className="bottom-navigation__link"
        href="#/"
        onClick={collapseMenu}
      >
        rights
      </a>
    </div>
  );
};
