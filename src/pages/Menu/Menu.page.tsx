import { Icon } from '../../components/base/Icon/Icon.component';
import { Nav } from '../../components/base/Nav/Nav.component';

export const MenuPage = () => {
  return (
    <>
      <div className="menu__container">
        <div className="menu__container-nav">
          <Nav navStyle="menu" />
        </div>
        <div className="menu__container-icons">
          <Icon iconUse="menu-page" iconType="favorite" />
          <Icon iconUse="menu-page" iconType="cart" />
        </div>
      </div>
    </>
  );
};
