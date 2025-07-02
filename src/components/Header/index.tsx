import { ButtonNames, ButtonsProps, Path } from '@shtypes/ButtonProps';
import { NavigationItem } from '@shtypes/NavLinkProps';
import { Logo } from '@shared/ui/Logo';
import { NavList } from '@shared/ui/nav__list';
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
      name: ButtonNames.Burger,
      path: Path.Burger,
    },
    {
      name: ButtonNames.Fav,
      path: Path.Fav,
    },
    {
      name: ButtonNames.Cart,
      path: Path.Cart,
    },
  ];

  return (
    <header className={`${styles.header} ${className}`}>
      <Logo className={`${styles.header__logo} header__logo`} />
      <NavList key={'header'} list={linksList} cN={`${styles.header__nav}`} />
      <div className="spacer" aria-hidden="true"></div>
      <HeaderButtons buttons={buttons} className={'menu-container'} />
    </header>
  );
};
