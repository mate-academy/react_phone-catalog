// import { Icons } from '../../types/enums/Icons';
// import { Icon } from '../Icon';
import { Navigation } from '../Navigation';
// import { Searchbar } from '../Searchbar';
import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__left-container">
        <span className="header__logo" />
        <Navigation />
      </div>
      {/* <div className="header__right-container">
        <Searchbar />
        <div className="header__right__controls">
          <Icon icon={Icons.Heart} />
        </div>
        <div className="header__right__controls">
          <Icon icon={Icons.Cart} />
        </div>
      </div> */}
    </div>
  );
};
