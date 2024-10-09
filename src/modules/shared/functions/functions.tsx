import { BagSVG } from '../components/SVGs/BagSVG';
import { HeartSVG } from '../components/SVGs/HeartSVG';
import { SettingsSVG } from '../components/SVGs/SettingsSVG';
import { Language, MenuLinkSVGOption } from '../types/enums';
import { HandleSliderDragEvent } from '../types/types';

type ItemWithLocales<Item> = Item & {
  locales: { [key: string]: Partial<Item> };
};

export const translateItem = <Item,>(
  items: ItemWithLocales<Item>[],
  language: Language,
): Item[] => {
  return items.map(item => {
    const { locales, ...rest } = item;

    if (locales) {
      const translatedValues = locales[language];
      const originalValues = { ...rest } as Item;

      return {
        ...originalValues,
        ...translatedValues,
      };
    }

    return item;
  });
};

export const getPageX = (event: HandleSliderDragEvent): number => {
  const type = event.type;

  if (type === 'touchmove' || type === 'touchstart') {
    return (event as React.TouchEvent<HTMLUListElement>).touches[0].pageX;
  } else if (type === 'mousemove' || type === 'mousedown') {
    return (event as React.MouseEvent<HTMLUListElement>).pageX;
  } else {
    throw new Error('Handle slider drag event type is not valid!!!');
  }
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

export function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
} //Delete!!!
