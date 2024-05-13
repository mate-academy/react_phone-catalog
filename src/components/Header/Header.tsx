import { Logo } from '../Logo';
import { Navigation } from '../Navigation/Navigation';
// import { NavSearch } from '../NavSearch/NavSearch';
import './Header.scss';
import { Toggler } from '../Elements/Toggler/Toggler';
import { PurchaseNavButtons } from '../Elements/PurchaseNavButtons';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <Logo className="header__logo" />
        <Navigation />
        {/* <NavSearch /> */}
      </div>
      <div className="header__right">
        <Toggler />
        <PurchaseNavButtons className="header__buttons" />
        <button
          className="button-square button-square--mobile"
          onClick={() => {}}
        >
          <div className="icon icon--menu"></div>
        </button>
      </div>
    </header>
  );
};
