import React from 'react';
import { tabs } from '../../../../App';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useSidebar } from '../Context/SidebarContext';
import { BagedIcon } from '../SVGElements/BagedIcon';
import { useCart, useFavorites } from '../Context';
import { Icon } from '../Icon';

export const Sidebar: React.FC = () => {
  const { showStatus, setShowStatus } = useSidebar();
  const { favorites } = useFavorites();
  const { cart } = useCart();

  return (
    <aside
      className={cn('sidebar page__sidebar', {
        'sidebar--active': showStatus,
        'sidebar--disabled': !showStatus,
      })}
      id="sidebar"
    >
      <ul className="sidebar__links page__sidebarLinks">
        {tabs.map(tab => {
          return (
            <li
              className="sidebar__item"
              key={tab.title}
              onClick={() => setShowStatus?.(false)}
            >
              <Link
                to={{ pathname: tab.link }}
                className="sidebar__link"
                key={tab.title}
              >
                {tab.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="sidebar__bottom" onClick={() => setShowStatus?.(false)}>
        <Link to="/favorites" className="sidebar__iconContainer">
          <BagedIcon
            amountOfProducts={favorites?.length || 0}
            classForBadge="badge badge__red"
          >
            <Icon iconSlug="Heart" />
          </BagedIcon>
        </Link>
        <Link to="/cart" className="sidebar__iconContainer">
          <BagedIcon
            amountOfProducts={cart?.length || 0}
            classForBadge="badge badge__red"
          >
            <Icon iconSlug="ShoppingBag" />
          </BagedIcon>
        </Link>
      </div>
    </aside>
  );
};
