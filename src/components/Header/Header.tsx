import { useState } from 'react';
import style from './Header.module.scss';
import logo from '../../../public/img/logo/logo-icon.svg';
import iconLike from '../../../public/img/icon-like.png';
import iconCart from '../../../public/img/icon-bag.png';
import menu from '../../../public/img/Menu.png';
import classNames from 'classnames';

export const Header = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cartItemCount, setCartItemCount] = useState<number>(1); // Стан для кількості товарів в кошику

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <header className={style.header}>
      <div className={style.header_container}>
        <a href="#" className={style.logo}>
          <img src={logo} className={style.icon} alt="logo" />
        </a>
        <div className={style.navigation}>
          <a
            href="#"
            className={classNames(style.navigation_link, {
              [style.is_active]: activeTab === 'home',
            })}
            onClick={() => handleTabClick('home')}
          >
            home
          </a>
          <a
            href="#"
            className={classNames(style.navigation_link, {
              [style.is_active]: activeTab === 'phones',
            })}
            onClick={() => handleTabClick('phones')}
          >
            phones
          </a>
          <a
            href="#"
            className={classNames(style.navigation_link, {
              [style.is_active]: activeTab === 'tablets',
            })}
            onClick={() => handleTabClick('tablets')}
          >
            tablets
          </a>
          <a
            href="#"
            className={classNames(style.navigation_link, {
              [style.is_active]: activeTab === 'accessories',
            })}
            onClick={() => handleTabClick('accessories')}
          >
            accessories
          </a>
        </div>
      </div>
      <div className={style.icons}>
        <a href="#" className={style.burger_menu}>
          <img src={menu} className={style.burger_menu_icon} alt="menu" />
        </a>
        <a
          href="#"
          className={classNames(style.like, {
            [style.is_active]: activeTab === 'like',
          })}
          onClick={() => handleTabClick('like')}
        >
          <img src={iconLike} className={style.like_icon} alt="like" />
        </a>
        <a
          href="#"
          className={classNames(style.bag, {
            [style.is_active]: activeTab === 'bag',
          })}
          onClick={() => handleTabClick('bag')}
        >
          <img src={iconCart} className={style.bag_icon} alt="bag" />
          {cartItemCount > 0 && (
            <div className={style.bag_badge}>{cartItemCount}</div>
          )}
        </a>
      </div>
    </header>
  );
};
