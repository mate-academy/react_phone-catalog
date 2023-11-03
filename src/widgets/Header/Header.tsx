import { Menu } from './ui/Menu';
import { Cart } from '../../features/Cart';
import { Favourites } from '../../features/Favourites';
import { Actions } from './ui/Actions';
import { Action } from './ui/Action';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.wrapper}>
      <Menu />
      <Actions>
        <Action link="/favourites">
          <Favourites />
        </Action>
        <Action link="/cart">
          <Cart />
        </Action>
      </Actions>
    </div>
  );
};
