import { Status } from '@features/index';
import { Conf, ProductProps } from '.';

const apiToUiMapper = {
  screen: 'Screen',
  capacity: 'Capacity',
  ram: 'RAM',
};

const baseDetailList: Record<string, string | null> = {
  [apiToUiMapper.screen]: null,
  [apiToUiMapper.capacity]: null,
  [apiToUiMapper.ram]: null,
};

const baseConf: Conf = {
  link: {
    to: '/',
    onClick: (e: React.MouseEvent) => e.preventDefault(),
  },
  name: 'Loading...',
  listData: baseDetailList,
  priceMain: 'Loading...',
  priceSecondary: null,
  buttonProps: {
    isInFav: false,
    isInCart: false,
    handleCart: (e: React.MouseEvent) => e.preventDefault(),
    handleFav: (e: React.MouseEvent) => e.preventDefault(),
  },
};

export const organizeProps = (
  data: ProductProps | Status,
  trackLinkHandler: (e: React.MouseEvent, path: string) => void,
): Conf => {
  if (typeof data === 'string') {
    return baseConf;
  }

  const { product, isIn, stateHandlers } = data;

  const mainPrice = product.priceDiscount
    ? `$${product.priceDiscount}`
    : `$${product.priceRegular}`;
  const secondaryPrice =
    product.priceDiscount && product.priceDiscount !== product.priceRegular
      ? `$${product.priceRegular}`
      : null;

  const linkPath = `/product/${product.id}`;
  const item = { id: product.id };

  return {
    link: {
      to: linkPath,
      onClick: (e: React.MouseEvent) => trackLinkHandler(e, linkPath),
    },
    name: product.name,
    listData: {
      [apiToUiMapper.screen]: product.screen,
      [apiToUiMapper.capacity]: product.capacity,
      [apiToUiMapper.ram]: product.ram,
    },
    priceMain: mainPrice,
    priceSecondary: secondaryPrice,
    image: {
      src: product.images[0],
      alt: product.name,
    },
    buttonProps: {
      isInFav: isIn.fav(product.id),
      isInCart: isIn.cart(product.id),
      handleCart: (e: React.MouseEvent) => stateHandlers.toggleCart(e, item),
      handleFav: (e: React.MouseEvent) => stateHandlers.toggleFav(e, item),
    },
  };
};
