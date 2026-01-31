import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Heart, Menu, ShoppingCart, X } from 'lucide-react';
import { Logo } from '../SVGElements/Logo';
import { useCart, useFavorites } from '../Context';
import { useSidebar } from '../Context/SidebarContext';
import { BagedIcon } from '../SVGElements/BagedIcon';
import { headerLinks } from '@mocks/Data/links';

interface Props {
  additionalClass?: string;
}

export const TopBar: React.FC<Props> = ({ additionalClass = '' }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const { showStatus, setShowStatus } = useSidebar();
  const [amountItemsInCart, setAmountItemsInCart] = useState(0);

  useEffect(() => {
    let res = 0;

    if (cart) {
      res = cart.reduce((prev, cur) => prev + cur.amount, 0);
    }

    setAmountItemsInCart(res);
  }, [cart]);

  return (
    <nav className={cn('topBar', additionalClass)} id="top">
      <ul className="topBar__items">
        <Link
          to="/home"
          className="topBar__logo"
          onClick={() => setShowStatus?.(false)}
        >
          <Logo width={64} height={22} />
        </Link>

        {headerLinks.map(link => (
          <li key={link.title} className="topBar__item">
            <Link to={{ pathname: link.link }} className="topBar__link">
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="topBar__icons">
        <button
          onClick={() => setShowStatus?.((cur: boolean) => !cur)}
          className={`topBar__icon topBar__icon--menu`}
        >
          {!showStatus ? <Menu size={16} /> : <X size={16} />}
        </button>

        <Link
          to={{ pathname: '/favorites' }}
          className="topBar__icon topBar__icon--favorites"
        >
          <BagedIcon
            amountOfProducts={favorites?.length || 0}
            classForBadge="badge badge__red"
          >
            <Heart size={16} id="favorite" className="icon" />
          </BagedIcon>
        </Link>

        <Link
          to={{ pathname: '/cart' }}
          className="topBar__icon topBar__icon--cart"
        >
          <BagedIcon
            amountOfProducts={amountItemsInCart}
            classForBadge="badge badge__red"
          >
            <ShoppingCart size={16} className="icon" />
          </BagedIcon>
        </Link>
      </div>
    </nav>
  );
};
