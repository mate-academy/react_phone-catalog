import { useContext, useEffect } from 'react';
import cn from 'classnames';
import './Menu.scss';

import Navbar from '../Header/Navbar/Navbar';
import { MenuContext } from '../../contexts/MenuContext';

const Menu = () => {
  const { isMenu } = useContext(MenuContext);

  useEffect(() => {
    if (isMenu) {
      document.body.classList.add('page__body--menu');
    } else {
      document.body.classList.remove('page__body--menu');
    }
  }, [isMenu]);

  return (
    <div className={cn('menu', { active: isMenu })}>
      <Navbar />
    </div>
  );
};

export default Menu;
