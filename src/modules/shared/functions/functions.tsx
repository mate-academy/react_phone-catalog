import { BagSVG } from '../components/SVGs/BagSVG';
import { HeartSVG } from '../components/SVGs/HeartSVG';
import { SettingsSVG } from '../components/SVGs/SettingsSVG';
import { MenuLinkSVGOption } from '../types/enums';

export const getMenuLinkSVG = (
  option: MenuLinkSVGOption,
  className?: string,
): React.JSX.Element => {
  switch (option) {
    case MenuLinkSVGOption.Settings:
      return <SettingsSVG className={className} />;
    case MenuLinkSVGOption.Heart:
      return <HeartSVG className={className} />;
    case MenuLinkSVGOption.Bag:
      return <BagSVG className={className} />;
    default:
      throw new Error('Menu link SVG option is not valid!!!');
  }
};
