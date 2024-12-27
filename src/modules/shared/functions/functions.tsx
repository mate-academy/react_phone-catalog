import { BagSVG } from '../components/SVGs/BagSVG';
import { HeartSVG } from '../components/SVGs/HeartSVG';
import { SettingsSVG } from '../components/SVGs/SettingsSVG';
import { MenuLinkSVGOption } from '../types/enums';
import { HandleSliderDragEvent } from '../types/handlers';
import { Pagination } from '../types/types';

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

export const getAmountOfPages = (
  pagination: Pagination,
  amountOfItems: number,
): number => {
  return pagination ? Math.ceil(amountOfItems / pagination) : 1;
};

export const getFirstItemOnPage = (
  pagination: Pagination,
  page: number,
): number => (pagination ? (page - 1) * pagination + 1 : 1);

export const getLastItemOnPage = (
  pagination: Pagination,
  page: number,
  amountOfItems: number,
): number => {
  if (pagination) {
    const lastItem = (page - 1) * pagination + pagination;

    return lastItem > amountOfItems ? amountOfItems : lastItem;
  } else {
    return amountOfItems;
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

export const wait = (delay: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });
