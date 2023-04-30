import { useContext } from 'react';
import cn from 'classnames';

import Navbar from '../Header/Navbar/Navbar';
import Shopbar from '../Header/Shopbar/Shopbar';
import './Menu.scss';
import { MenuContext } from '../../contexts/MenuContext';

const Menu = () => {
  const { isMenu } = useContext(MenuContext);

  return (
    <div className={cn('menu', { active: isMenu })}>
      <Navbar />
      <Shopbar />
    </div>
  );
};

export default Menu;
