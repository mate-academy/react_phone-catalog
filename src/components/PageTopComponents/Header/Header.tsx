import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Icon, IconOrigin, IconType } from '../Icon';
import { Navigation, NavOrigin } from '../Navigation';
import cl from './Header.module.scss';
import { useAppSelector } from '../../../app/hooks';

export enum HeaderOrigin {
  ONPAGE = 'onPage',
  ONMENU = 'onMenu',
}

type Props = {
  origin: HeaderOrigin;
};

export const Header: React.FC<Props> = ({ origin }) => {
  const { isMenuOpened } = useAppSelector(st => st.global);

  if (origin === 'onMenu') {
    return (
      <div className="container container__header">
        <header className={cl.header}>
          <div className={cl.header__logoWrapper}>
            <Link className={cl.header__logoLink} to="/" />
          </div>
          <Icon type={IconType.CLOSE} origin={IconOrigin.ONHEADER} />
        </header>
      </div>
    );
  }

  return (
    <div
      className={cn('container container__header', {
        'hide-container': isMenuOpened,
      })}
    >
      <header className={cl.header}>
        <div className={cl.header__logoNavContainer}>
          <div className={cl.header__logoWrapper}>
            <Link className={cl.header__logoLink} to="/" />
          </div>
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
