import type { Product } from '../types/Product';

interface ScaleConfig {
  phones: {
    pro14: string;
    iphone8: string;
    iphone7: string;
    default: string;
  };
  tablets: {
    mini6thStarlight: string;
    mini6th: string;
    mini5th: string;
    default: string;
  };
  accessories: string;
  defaultScale: string;
}

export const getImageScale = (
  product: Product,
  config: ScaleConfig,
): string => {
  const productName = product.name.toLowerCase();
  const category = product.category.toLowerCase();

  switch (category) {
    case 'phones':
      if (productName.includes('pro') && productName.includes('14')) {
        return config.phones.pro14;
      }
      if (productName.includes('8')) {
        return config.phones.iphone8;
      }
      if (productName.includes('7')) {
        return config.phones.iphone7;
      }
      return config.phones.default;

    case 'tablets':
      if (
        productName.includes('mini') &&
        productName.includes('6th') &&
        product.color &&
        product.color.includes('starlight')
      ) {
        return config.tablets.mini6thStarlight;
      }
      if (productName.includes('mini') && productName.includes('6th')) {
        return config.tablets.mini6th;
      }
      if (productName.includes('mini') && productName.includes('5th')) {
        return config.tablets.mini5th;
      }
      return config.tablets.default;

    case 'accessories':
      return config.accessories;

    default:
      return config.defaultScale;
  }
};

// Конфігурації для різних компонентів
export const PRODUCT_CARD_SCALE_CONFIG: ScaleConfig = {
  phones: {
    pro14: 'scale-75 tablet:scale-75 desktop:scale-75',
    iphone8: 'scale-45 tablet:scale-45 desktop:scale-45',
    iphone7: 'scale-50 tablet:scale-50 desktop:scale-50',
    default: 'scale-45 tablet:scale-45 desktop:scale-45',
  },
  tablets: {
    mini6thStarlight: 'scale-90 tablet:scale-90 desktop:scale-90',
    mini6th: 'scale-125 tablet:scale-125 desktop:scale-125',
    mini5th: 'scale-110 tablet:scale-110 desktop:scale-110',
    default: 'scale-75 tablet:scale-75 desktop:scale-75',
  },
  accessories: 'scale-78 tablet:scale-78 desktop:scale-78',
  defaultScale: 'scale-90 tablet:scale-90 desktop:scale-90',
};

export const CART_ITEM_SCALE_CONFIG: ScaleConfig = {
  phones: {
    pro14: 'scale-90',
    iphone8: 'scale-45',
    iphone7: 'scale-60',
    default: 'scale-45',
  },
  tablets: {
    mini6thStarlight: 'scale-90',
    mini6th: 'scale-130',
    mini5th: 'scale-110',
    default: 'scale-75',
  },
  accessories: 'scale-78',
  defaultScale: 'scale-100',
};
