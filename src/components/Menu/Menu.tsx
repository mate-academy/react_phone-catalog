import './Menu.scss';

import { LuHeart } from 'react-icons/lu';
import { LuShoppingBag } from 'react-icons/lu';

import { GrClose } from "react-icons/gr";
import classNames from 'classnames';
export const Menu = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { ' has-underline': isActive });
  return (
    <aside className="menu" id="menu">
      <div className="menu__top">
        <div className="menu__logo">
          <a href="#home">
            <img
              src="/img/logo.png"
              alt="company_logo"
            />
          </a>
        </div>
        <div className="close">
          <a href="#home">
            <GrClose />
          </a>
        </div>
      </div>
      
      <div className="menu__link__container">
        
        <a href="#home" className={getLinkClass}>
          HOME
        </a>

        <a href="#phones" className={getLinkClass}>
          PHONES
        </a>

        <a href="#tablets" className={getLinkClass}>
          TABLETS
        </a>

        <a href="#accessories" className={getLinkClass}>
          ACCESSORIES
        </a>
      </div>
      
      <div className="menu__bottom">
        <a href="#favorites" className="menu__heart">
          <LuHeart />
        </a>

        <div className="menu__basket">
          <a href="#cart">
            <LuShoppingBag />
          </a>
        </div>
      </div>
    </aside>
  );
};
export default Menu;
