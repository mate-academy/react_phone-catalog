import { Navigation } from '../Navigation/Navigation';
import { TopAction } from '../TopAction/TopAction';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__menu">
        <div className="header__menu-item">
          <TopAction />
        </div>
        <div className="header__menu-item">
          <Navigation />
        </div>
      </div>
    </header>
  );
};
