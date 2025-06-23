import {
  HeaderButtonNames,
  ButtonsProps,
  Path,
} from '../../shared/types/Menu-UIProps';
import { NavigationItem } from '../../shared/types/NavLinkProps';
import { Logo } from '../../shared/ui/Logo';
import { NavList } from '../../shared/ui/nav__list';
import { HeaderButtons } from './components/header-buttons';
import styles from './header.module.scss';
import {
  HeaderLabelProp,
  HeaderNavName,
  HeaderRoutePath,
} from './types/headerLinks';

type Props = {
  className: string;
};

export const Header = ({ className }: Props) => {
  const linksList: NavigationItem[] = [
    {
      name: HeaderNavName.Home,
      path: HeaderRoutePath.Home,
      labelProp: HeaderLabelProp.Home,
    },
    {
      name: HeaderNavName.Phones,
      path: HeaderRoutePath.Phones,
      labelProp: HeaderLabelProp.Phones,
    },
    {
      name: HeaderNavName.Tablets,
      path: HeaderRoutePath.Tablets,
      labelProp: HeaderLabelProp.Tablets,
    },
    {
      name: HeaderNavName.Accessories,
      path: HeaderRoutePath.Accessories,
      labelProp: HeaderLabelProp.Accessories,
    },
  ];

  const buttons: ButtonsProps[] = [
    {
      name: HeaderButtonNames.Burger,
      path: Path.Burger,
    },
    {
      name: HeaderButtonNames.Fav,
      path: Path.Fav,
    },
    {
      name: HeaderButtonNames.Cart,
      path: Path.Cart,
    },
  ];

  return (
    <header className={`${styles.header} ${className}`}>
      <Logo className={`${styles.header__logo} header__logo`} />
      <div className="left-spacer" aria-hidden="true"></div>
      <NavList key={'header'} list={linksList} cN={`${styles.header__nav}`} />
      <div className="right-spacer" aria-hidden="true"></div>
      <HeaderButtons buttons={buttons} className={'menu-container'} />
    </header>
  );
};
