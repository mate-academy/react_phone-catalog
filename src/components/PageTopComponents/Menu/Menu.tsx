import cn from 'classnames';
import { Header, HeaderOrigin } from '../Header';
import { Icon, IconOrigin, IconType } from '../Icon';
import { Navigation, NavOrigin } from '../Navigation';
import cl from './Menu.module.scss';
import { useAppSelector } from '../../../app/hooks';

export const Menu: React.FC = () => {
  const { isMenuOpened } = useAppSelector(st => st.global);

  return (
    <aside className={cn(`${cl.menu}`, { [cl.menu__showMenu]: isMenuOpened })}>
      <Header origin={HeaderOrigin.ONMENU} />

      <div className={cl.menu__navFavCartWrapper}>
        <nav className={cl.menu__nav}>
          <Navigation origin={NavOrigin.ONMENU} />
        </nav>
        <nav className={cl.menu__favCart}>
          <Icon type={IconType.FAV} origin={IconOrigin.ONMENU} />
          <Icon type={IconType.CART} origin={IconOrigin.ONMENU} />
        </nav>
      </div>
    </aside>
  );
};
