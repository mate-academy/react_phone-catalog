import { Link } from 'react-router-dom';
import LinkNavigate from '../LinkNavigate/LinkNavigate';
import { NAV_LINKS } from '../MobileMenu/MobileMenu';
import './DesktopMenu.scss';
import { IconWithBadge } from '../../components/ui/Icon/Icon';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

export default function DesktopMenu({
  onClose,
}: {
  onClose: (isOpenMenu: boolean) => void;
}) {
  const { totalCount: cartCount } = useCart();
  const { totalCount: favCount } = useFavorites();

  return (
    <div className="DesktopMenu">
      <nav className="DesktopMenu__nav">
        {NAV_LINKS.map(item => {
          return (
            <LinkNavigate
              key={item.to}
              type="desktop"
              textLink={item.text}
              to={item.to}
              callback={onClose}
            />
          );
        })}
      </nav>

      <div className="DesktopMenu__actions">
        <div className="DesktopMenu__action">
          <Link to={'/favorites'}>
            <IconWithBadge name="favorites" badge={favCount} />
          </Link>
        </div>
        <div className="DesktopMenu__action">
          <Link to={'/cart'}>
            <IconWithBadge name="cart" badge={cartCount} />
          </Link>
        </div>
      </div>
    </div>
  );
}
