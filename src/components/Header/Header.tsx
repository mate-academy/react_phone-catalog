// import { Cart } from '../Cart';
// import { Favorites } from '../Favorites';
import { Logo } from '../Logo';
// import { Nav } from '../Nav';
// import { NavMobile } from '../NavMobile';

import classes from './Header.module.scss';

export const Header = () => {
  return (
    <header className={classes.Header}>
      <div className={classes.Header__left}>
        <div className={classes.Header__logo}>
          <Logo />
        </div>

        <div className={classes.Header__nav}>
          {/* <Nav /> */}
          Nav
        </div>
      </div>

      <div className={classes.Header__right}>
        <div className={classes.Header__favorites}>
          {/* <Favorites /> */}
          Favorites
        </div>
        <div className={classes.Header__cart}>
          {/* <Cart /> */}
          Cart
        </div>
        {/* <NavMobile /> */}
        NavMobile
      </div>
    </header>
  );
};
