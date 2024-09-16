import { BagSVG } from '../components/SVGs/BagSVG';
import { HeartSVG } from '../components/SVGs/HeartSVG';
import { SettingsSVG } from '../components/SVGs/SettingsSVG';
import { Language, MenuLinkSVGOption } from '../types/enums';

type ItemWithLocales<Item> = Item & {
  locales: { [key: string]: Partial<Item> };
};

export const translateItem = <Item,>(
  items: ItemWithLocales<Item>[],
  language: Language,
): Item[] => {
  return items.map(item => {
    const { locales, ...rest } = item;
    const translatedValues = locales[language];
    const originalValues = { ...rest } as Item;

    return {
      ...originalValues,
      ...translatedValues,
    };
  });
};

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
