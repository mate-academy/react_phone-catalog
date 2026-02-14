/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable prettier/prettier */
import classNames from 'classnames';
import * as Types from '../types';
import { Images } from '../images';

export const isProductsPage = (pathname: string, findName: boolean) => {
  const pages = [
    Types.PageName.Phones,
    Types.PageName.Tablets,
    Types.PageName.Accessories,
    Types.PageName.Favourites,
  ];

  return findName
    ? pages
      .find(name => name.toLowerCase() === pathname.slice(1))
      ?.toLowerCase()
    : pages.some(name => name.toLowerCase() === pathname.slice(1));
};

export const getHotProducts = (products: Types.Product[]) =>
  products.filter(({ fullPrice, price }) => price / fullPrice <= 0.88);

export const getIdForProduct = (
  selectedItemId: string,
  products: Types.Product[],
) => products.find(({ itemId }) => itemId === selectedItemId)?.id || null;

export const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('link', { link__active: isActive });
};

export const getPhotoClass = (path: Types.Category, conteiner: boolean) => {
  return conteiner
    ? classNames('categories__block--container', {
      'categories__block--container-phones': path === Types.Category.Phones,
      'categories__block--container-tablets': path === Types.Category.Tablets,
      'categories__block--container-accessories':
        path === Types.Category.Accessories,
    })
    : classNames('categories__block--title', {
      'categories__block--phones': path === Types.Category.Phones,
      'categories__block--tablets': path === Types.Category.Tablets,
      'categories__block--accessories': path === Types.Category.Accessories,
    });
};

export const includesItem = (
  items: Types.CartProduct[] | Types.Product[],
  idItem?: number | string,
) =>
  items.some(item =>
    'product' in item ? item.product.itemId === idItem : item.itemId === idItem,
  );

export const scrollWindowTop = () => window.scrollTo({ top: 0 });

export const getNewProductLink = (
  oldCategory?: Types.Category,
  oldNamespaceId?: string,
  newCapacity?: string,
  newColor?: string,
) => {
  const fixColor =
    newColor && newColor?.split(' ').length >= 2
      ? newColor?.split(' ').join('-')
      : newColor;

  return `/${oldCategory}/${oldNamespaceId}-${newCapacity?.toLowerCase()}-${fixColor}`;
};

export const getNewProducts = (products: Types.Product[]) =>
  products.filter(({ year }) => year === 2022);

export const getNormalColor = (oldColor: string) => {
  switch (oldColor) {
    case 'spacegray':
    case 'space gray':
      return Types.FixColor.Spacegray;
    case 'midnightgreen':
      return Types.FixColor.Midnightgreen;
    case 'midnight':
      return Types.FixColor.Midnight;
    case 'starlight':
      return Types.FixColor.Starlight;
    case 'rose gold':
    case 'rosegold':
      return Types.FixColor.Rosegold;
    case 'gold':
      return Types.FixColor.Gold;
    case 'yellow':
      return Types.FixColor.Yellow;
    case 'purple':
      return Types.FixColor.Purple;
    case 'sky blue':
      return Types.FixColor.Skyblue;
    case 'spaceblack':
      return Types.FixColor.Spaceblack;
    case 'sierrablue':
      return Types.FixColor.Sierrablue;
    case 'graphite':
      return Types.FixColor.Graphite;
    default:
      return oldColor;
  }
};

export const getNumbers = (length: number) =>
  Array.from({ length }, (_, i) => i + 1);

export const getPathName = (pathname: string) => {
  switch (pathname) {
    case Types.Category.Phones:
      return Types.PageName.Phones;
    case Types.Category.Tablets:
      return Types.PageName.Tablets;
    case Types.Category.Accessories:
      return Types.PageName.Accessories;
    default:
      return Types.PageName.Favourites;
  }
};

export const getProductByItemId = (
  product: Types.ProductDetails,
  products: Types.Product[],
): Types.Product | null => {
  const foundedProduct = products.find(({ itemId }) => itemId === product?.id);

  return foundedProduct ? foundedProduct : null;
};

export const getProductsByCategory = (
  products: Types.Product[],
  curCategory?: Types.Category,
) => products.filter(({ category }) => category === curCategory);

export const getRandomProducts = (
  products: Types.Product[],
  category?: Types.Category,
) => getProductsByCategory(products, category).sort(() => Math.random() - 0.5);

export function getSearchWith(
  paramsToUpdate: Types.SearchParams,
  currentParams: URLSearchParams,
): string {
  const newParams = new URLSearchParams(currentParams.toString());

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}

export const getParamsForDropDown = (itemsCount: number | null) => {
  switch (itemsCount) {
    case null:
      return [
        { label: Types.SortType.None, value: Types.SortType.None },
        { label: Types.SortType.Newest, value: Types.SortType.Newest },
        {
          label: Types.SortType.Alphabetically,
          value: Types.SortType.Alphabetically,
        },
        { label: Types.SortType.Cheapest, value: Types.SortType.Cheapest },
      ];
    default:
      return [
        { label: Types.PerPage.All, value: itemsCount },
        { label: Types.PerPage.Low, value: +Types.PerPage.Low },
        { label: Types.PerPage.Medium, value: +Types.PerPage.Medium },
        { label: Types.PerPage.High, value: +Types.PerPage.High },
      ].filter((param, index) =>
        index > 0 ? param.value < itemsCount : param,
      );
  }
};

export const operationDo = (
  currentCart: Types.CartProduct[],
  cartProduct: Types.CartProduct,
  operationType?: Types.Operation,
) => {
  switch (operationType) {
    case undefined:
      return currentCart.filter(({ id }) => id !== cartProduct.id);
    default:
      return currentCart.map(curCartProduct =>
        curCartProduct.id === cartProduct.id
          ? {
            ...curCartProduct,
            quantity: curCartProduct.quantity + Number(operationType),
          }
          : curCartProduct,
      );
  }
};

export const disableScroll = (value: boolean) => {
  if (value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.body.style.overflow = 'auto';
  };
};

export const getFilteredProducts = (products: Types.Product[], query: string) =>
  products.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase()),
  );

export const getSortedProducts = (
  products: Types.Product[],
  sortType: Types.SortType,
) => {
  switch (sortType) {
    case Types.SortType.Newest:
      return [...products].sort((a, b) => b.year - a.year);
    case Types.SortType.Alphabetically:
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    case Types.SortType.Cheapest:
      return [...products].sort((a, b) => a.price - b.price);
    case Types.SortType.None:
      return products;
  }
};

export const getSliderParams = (
  sliderItemsCount: number,
  currentdata: Types.SliderData,
): Types.SliderData => {
  const page = document.querySelector('.page');
  const slider = document.querySelector('.slider__list');

  if (page && slider) {
    const pageWidth = page.getBoundingClientRect().width;
    const sliderWidth = slider.getBoundingClientRect().width;
    const newData = { ...currentdata, pageWidth, sliderWidth };
    const { translateCount } = newData;

    const getFixTranslate = (itemWidthValue: number) => {
      const totalWidth = sliderItemsCount * (itemWidthValue + 16) - 16;
      const excessWidth = sliderWidth - totalWidth;

      return Math.max((itemWidthValue + 16) * -translateCount, excessWidth);
    };

    if (pageWidth >= 1200) {
      return {
        ...newData,
        itemWidth: 272,
        translateIndex: 4,
        translate: getFixTranslate(272),
      };
    } else if (pageWidth >= 1045) {
      return {
        ...newData,
        itemWidth: 237,
        translateIndex: 4,
        translate: getFixTranslate(237),
      };
    } else if (pageWidth >= 768) {
      return {
        ...newData,
        itemWidth: 237,
        translateIndex: 3,
        translate: getFixTranslate(237),
      };
    } else if (pageWidth >= 640) {
      return {
        ...newData,
        itemWidth: 237,
        translateIndex: 2,
        translate: getFixTranslate(237),
      };
    } else if (pageWidth >= 500) {
      return {
        ...newData,
        itemWidth: 212,
        translateIndex: 2,
        translate: getFixTranslate(212),
      };
    } else {
      return {
        ...newData,
        itemWidth: 212,
        translateIndex: 1,
        translate: getFixTranslate(212),
      };
    }
  } else {
    return {} as Types.SliderData;
  }
};

export const getBunnerImages = (pageWidth: number) =>
  pageWidth >= 640
    ? Object.values(Images.Banner.Big)
    : Object.values(Images.Banner.Small);

export const getQuantityText = (totalCartQuantity: number | null) =>
  totalCartQuantity === 1
    ? `Total for ${totalCartQuantity} item`
    : `Total for ${totalCartQuantity} items`;
