import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { IconWithBadge } from '../../components/ui/Icon/Icon';
import LinkNavigate from '../LinkNavigate/LinkNavigate';
import './MobileMenu.scss';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

export const NAV_LINKS = [
  { to: '/', text: 'Home' },
  { to: '/phones', text: 'Phones' },
  { to: '/tablets', text: 'Tablets' },
  { to: '/accessories', text: 'Accessories' },
];

type Props = {
  onClose: () => void;
};

export const MobileMenu = forwardRef<HTMLDivElement, Props>(
  ({ onClose }, ref) => {
    const { totalCount: cartCount } = useCart();
    const { totalCount: favCount } = useFavorites();

    return (
      <div className="mobileMenu" ref={ref}>
        <div className="mobileMenu__content">
          <nav className="mobileMenu__nav">
            {NAV_LINKS.map(link => (
              <LinkNavigate
                key={link.to}
                to={link.to}
                textLink={link.text}
                type="mobile"
                callback={onClose}
              />
            ))}
          </nav>
          <div className="mobileMenu__actions">
            <div className="mobileMenu__action">
              <Link to={'/favorites'} onClick={onClose}>
                <IconWithBadge name="heart" badge={favCount} />
              </Link>
            </div>
            <div className="mobileMenu__action">
              <Link to={'cart'} onClick={onClose}>
                <IconWithBadge name="cart" badge={cartCount} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MobileMenu.displayName = 'MobileMenu';
