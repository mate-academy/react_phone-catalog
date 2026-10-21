import { Product, RawProduct } from '../types/Product';

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
};

export const getProductId = (
  product: Pick<RawProduct, 'id' | 'itemId' | 'phoneId'>,
) => String(product.itemId || product.phoneId || product.id || '');

const cleanImagePath = (path?: string) => {
  if (!path) {
    return '';
  }

  if (path.startsWith('http')) {
    return path;
  }

  let cleanPath = path.replace(/^api\//, '').replace(/^\/+/, '');

  if (cleanPath && !cleanPath.startsWith('img/')) {
    cleanPath = `img/${cleanPath}`;
  }

  return cleanPath;
};

export const normalizeProduct = (raw: RawProduct): Product => {
  const image = cleanImagePath(
    raw.image || (Array.isArray(raw.images) ? raw.images[0] : ''),
  );
  const fullPrice = toNumber(raw.fullPrice ?? raw.priceRegular ?? raw.price);
  const discountSource = raw.priceDiscount ?? raw.price;
  const price =
    discountSource == null ? fullPrice : toNumber(discountSource, fullPrice);

  return {
    ...raw,
    id: getProductId(raw),
    category: raw.category || '',
    name: raw.name || '',
    fullPrice,
    price,
    screen: raw.screen || '',
    capacity: raw.capacity || '',
    color: raw.color || '',
    ram: raw.ram || '',
    year: toNumber(raw.year),
    image,
    images: raw.images?.map(item => cleanImagePath(item)),
  };
};

type PriceFields = 'price' | 'priceDiscount' | 'fullPrice' | 'priceRegular';

type PricedProduct = Pick<Product, PriceFields>;

export const getCurrentPrice = (product: PricedProduct) => {
  const value =
    product.priceDiscount ??
    product.price ??
    product.fullPrice ??
    product.priceRegular;

  return toNumber(value);
};

export const getRegularPrice = (product: PricedProduct) => {
  const value =
    product.fullPrice ?? product.priceRegular ?? getCurrentPrice(product);

  return toNumber(value);
};

export const shuffle = <T>(items: T[]): T[] => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = copy[index];

    copy[index] = copy[swapIndex];
    copy[swapIndex] = current;
  }

  return copy;
};

export const findVariant = (
  items: Product[],
  current: Product,
  next: { color?: string; capacity?: string },
) => {
  const color = (next.color ?? current.color).toLowerCase();
  const capacity = (next.capacity ?? current.capacity).toLowerCase();

  if (!current.namespaceId) {
    return undefined;
  }

  return items.find(
    item =>
      item.namespaceId === current.namespaceId &&
      item.color.toLowerCase() === color &&
      item.capacity.toLowerCase() === capacity,
  );
};
