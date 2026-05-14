import type { Product, ProductWithDetails } from '../../types/product';

type ProductView = ProductWithDetails;

const colorMap: Record<string, string> = {
  black: '#1f2020',
  blue: '#4c77a8',
  coral: '#ff7f6e',
  gold: '#f4d6b8',
  graphite: '#54524f',
  green: '#aee1cd',
  midnight: '#1f2833',
  midnightgreen: '#4e5851',
  pink: '#f7c8cf',
  purple: '#d9c7f1',
  red: '#c91c2d',
  rosegold: '#f6c7bd',
  silver: '#e4e6e8',
  skyblue: '#b9d8ee',
  spaceblack: '#1d1d1f',
  spacegray: '#535150',
  starlight: '#f2eadf',
  white: '#f8f8f8',
  yellow: '#f7e27b',
};

export const normalizeOption = (value?: string | number | null) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

export const getProductNamespace = (item: ProductView) => {
  if (item.namespaceId) {
    return String(item.namespaceId);
  }

  const id = item.itemId;
  const color = toSlug(item.color);
  const withoutColor = id.endsWith(`-${color}`) ? id.slice(0, -color.length - 1) : id;

  return withoutColor.replace(/-\d+(gb|tb|mm)$/i, '');
};

export const getProductCapacity = (item: Product) => {
  const id = item.itemId;
  const color = toSlug(item.color);
  const withoutColor = id.endsWith(`-${color}`) ? id.slice(0, -color.length - 1) : id;
  const capacityFromId = withoutColor.match(/(\d+(gb|tb|mm))$/i)?.[1];

  return capacityFromId ?? item.capacity;
};

export const formatOption = (value: string | number) =>
  String(value)
    .replace(/(\d+)\s*(gb|tb)$/i, '$1 $2')
    .toUpperCase();

export const getColorValue = (color: string) =>
  colorMap[normalizeOption(color)] ?? color.replace(/\s+/g, '').toLowerCase();

export const getProductWithHiddenDiscount = <T extends Product | undefined>(
  product: T,
  hideDiscount: boolean,
): T => {
  if (!product || !hideDiscount) {
    return product;
  }

  return {
    ...product,
    price: product.fullPrice ?? product.price,
    fullPrice: undefined,
  } as T;
};

export const getProductOptionValues = (product: ProductView) => ({
  colors: product.colorsAvailable ?? [product.color],
  capacities: product.capacityAvailable ?? [product.capacity],
});

export const getProductPrice = (product: ProductView, hideDiscount = false) => {
  if (hideDiscount) {
    return {
      priceValue: Number(product.priceRegular ?? product.fullPrice ?? product.price),
      fullPriceValue: undefined,
    };
  }

  const price = product.priceDiscount ?? product.price;
  const fullPrice = product.priceDiscount !== undefined ? product.priceRegular : product.fullPrice;

  return {
    priceValue: Number(price),
    fullPriceValue: fullPrice === undefined ? undefined : Number(fullPrice),
  };
};

export const getProductSpecs = (product: ProductView, keys: Array<keyof ProductView>) =>
  keys
    .map(key => {
      const value = product[key];

      if (!value) {
        return null;
      }

      return {
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: Array.isArray(value) ? value.join(', ') : String(value),
      };
    })
    .filter((spec): spec is { label: string; value: string } => Boolean(spec));
