import { AriaNames, IconPath } from '@shared/types/ButtonProps';
import { NavigationItem } from '@shared/types/NavLinkProps';
import { Logo } from '@ui/Logo';
import { NavList } from '@ui/nav__list';
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

  const buttons = [
    {
      ariaName: AriaNames.Burger,
      iconPath: IconPath.Burger,
    },
    {
      ariaName: AriaNames.Fav,
      iconPath: IconPath.Fav,
    },
    {
      ariaName: AriaNames.Cart,
      iconPath: IconPath.Cart,
    },
  ];

  return (
    <header className={`${styles.header} ${className}`}>
      <Logo />
      <NavList key={'header'} className={styles.header__nav} list={linksList} />
      <div aria-hidden="true"></div>
      <HeaderButtons buttons={buttons} />
    </header>
  );
};
