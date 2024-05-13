import { PurchaseNavButtons } from '../Elements/PurchaseNavButtons';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation/Navigation';
import './MobileMenu.scss';

export const MobileMenu = () => {
  return (
    // <aside className="menu menu--open">
    <aside className="menu">
      <div className="menu__top">
        <Logo />
        <button className="button-square" onClick={() => {}}>
          <div className="icon icon--close"></div>
        </button>
      </div>
      <Navigation className="menu__nav" />
      <PurchaseNavButtons className="menu__buttons" />
    </aside>
  );
};
