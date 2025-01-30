import cn from 'classnames';

import { Icon, IconOrigin, IconType } from '../Icon';
import { Navigation, NavOrigin } from '../Navigation';
import cl from './Header.module.scss';
import { useAppSelector } from '../../../app/hooks';
import { Logo } from '../../ui/Logo';

export enum HeaderOrigin {
  ONPAGE = 'onPage',
  ONMENU = 'onMenu',
}

type Props = {
  origin: HeaderOrigin;
};

export const Header: React.FC<Props> = ({ origin }) => {
  const { isMenuOpened } = useAppSelector(st => st.global);

  if (origin === HeaderOrigin.ONMENU) {
    return (
      <div className="container container__header">
        <header className={cl.header}>
          <Logo />
          <Icon type={IconType.CLOSE} origin={IconOrigin.ONHEADER} />
        </header>
      </div>
    );
  }

  return (
    <div
      className={cn('container container__header container__headerPage', {
        'hide-container': isMenuOpened,
      })}
    >
      <header className={cl.header}>
        <div className={cl.header__logoNavContainer}>
          <Logo />
          <nav className={cl.header__nav}>
            <Navigation origin={NavOrigin.ONHEADER} />
          </nav>
        </div>

        <nav className={cl.header__favCart}>
          <Icon type={IconType.FAV} origin={IconOrigin.ONHEADER} />
          <Icon type={IconType.CART} origin={IconOrigin.ONHEADER} />
        </nav>

        <Icon
          type={IconType.BURGER}
          className={cl.header__burger}
          origin={IconOrigin.ONHEADER}
        />
      </header>
    </div>
  );
};
