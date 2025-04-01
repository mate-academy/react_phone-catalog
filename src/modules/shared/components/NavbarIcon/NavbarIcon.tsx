import { IconType } from '../../types/IconType';
import { Icon } from '../Icon/Icon';
import navIconStyles from './NavbarIcon.module.scss';

interface Props {
  containerType: 'menu' | 'like' | 'cart';
  iconType: IconType;
  iconAddress: string;
  contentCart?: number;
  contentFav?: number;
}

export const NavbarIcon = ({
  containerType,
  iconType,
  iconAddress,
  contentCart = 0,
  contentFav = 0,
}: Props) => {
  return (
    <div
      className={`${navIconStyles.navbarIcon__icon_container} ${navIconStyles[`navbarIcon__icon_container--${containerType}`]}`}
    >
      <Icon
        iconType={iconType}
        address={iconAddress}
        contentCart={contentCart}
        contentFav={contentFav}
      />
    </div>
  );
};
