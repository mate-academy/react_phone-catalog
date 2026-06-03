import { Category, Product } from '../types';
import { getAssetPath } from '../utils/assets';

const categoryFiles: Record<Category, string> = {
  phones: getAssetPath('api/phones.json'),
  tablets: getAssetPath('api/tablets.json'),
  accessories: getAssetPath('api/accessories.json'),
};

const listFile = getAssetPath('api/products.json');

const proDescription = [
  'A transformative triple-camera system that adds tons of capability ' +
    'without complexity.',
  'An unprecedented leap in battery life. And a mind-blowing chip that ' +
    'doubles down on machine learning and pushes the boundaries of what ' +
    'a smartphone can do.',
];

const brandNewProducts: Product[] = [
  {
    id: 'apple-iphone-14-pro-128gb-silver',
    itemId: 'apple-iphone-14-pro-128gb-silver',
    category: 'phones',
    namespaceId: 'apple-iphone-14-pro',
    name: 'Apple iPhone 14 Pro 128GB Silver (MQQ23)',
    fullPrice: 999,
    price: 999,
    priceRegular: 999,
    priceDiscount: 999,
    screen: '6.1" OLED',
    resolution: '2556x1179',
    processor: 'Apple A16 Bionic',
    ram: '6GB',
    camera: '48 Mp + 12 Mp + 12MP',
    zoom: 'Digital 5x, Optical 2x',
    color: 'silver',
    colorsAvailable: ['silver'],
    capacity: '128GB',
    capacityAvailable: ['128GB'],
    image: 'img/figma/new-iphone-14-pro-silver.png',
    images: ['img/figma/new-iphone-14-pro-silver.png'],
    year: 2022,
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE', '5G'],
    description: [
      {
        title: 'And then was a Pro',
        text: proDescription,
      },
    ],
  },
  {
    id: 'apple-iphone-14-pro-128gb-deeppurple',
    itemId: 'apple-iphone-14-pro-128gb-deeppurple',
    category: 'phones',
    namespaceId: 'apple-iphone-14-pro',
    name: 'Apple iPhone 14 Pro 128GB Deep Purple (MQ0G3)',
    fullPrice: 999,
    price: 999,
    priceRegular: 999,
    priceDiscount: 999,
    screen: '6.1" OLED',
    resolution: '2556x1179',
    processor: 'Apple A16 Bionic',
    ram: '6GB',
    camera: '48 Mp + 12 Mp + 12MP',
    zoom: 'Digital 5x, Optical 2x',
    color: 'deeppurple',
    colorsAvailable: ['deeppurple'],
    capacity: '128GB',
    capacityAvailable: ['128GB'],
    image: 'img/figma/new-iphone-14-pro-gold.png',
    images: ['img/figma/new-iphone-14-pro-gold.png'],
    year: 2022,
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE', '5G'],
    description: [
      {
        title: 'And then was a Pro',
        text: proDescription,
      },
    ],
  },
  {
    id: 'apple-iphone-14-pro-128gb-gold',
    itemId: 'apple-iphone-14-pro-128gb-gold',
    category: 'phones',
    namespaceId: 'apple-iphone-14-pro',
    name: 'Apple iPhone 14 Pro 128GB Gold (MQ083)',
    fullPrice: 999,
    price: 999,
    priceRegular: 999,
    priceDiscount: 999,
    screen: '6.1" OLED',
    resolution: '2556x1179',
    processor: 'Apple A16 Bionic',
    ram: '6GB',
    camera: '48 Mp + 12 Mp + 12MP',
    zoom: 'Digital 5x, Optical 2x',
    color: 'gold',
    colorsAvailable: ['gold'],
    capacity: '128GB',
    capacityAvailable: ['128GB'],
    image: 'img/figma/new-iphone-14-pro-purple.png',
    images: ['img/figma/new-iphone-14-pro-purple.png'],
    year: 2022,
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE', '5G'],
    description: [
      {
        title: 'And then was a Pro',
        text: proDescription,
      },
    ],
  },
  {
    id: 'apple-iphone-14-plus-128gb-red',
    itemId: 'apple-iphone-14-plus-128gb-red',
    category: 'phones',
    namespaceId: 'apple-iphone-14-plus',
    name: 'Apple iPhone 14 Plus 128GB PRODUCT Red (MQ513)',
    fullPrice: 859,
    price: 859,
    priceRegular: 859,
    priceDiscount: 859,
    screen: '6.7" OLED',
    resolution: '2778x1284',
    processor: 'Apple A15 Bionic',
    ram: '6GB',
    camera: '12 Mp + 12 Mp',
    zoom: 'Digital 5x, Optical 2x',
    color: 'red',
    colorsAvailable: ['red'],
    capacity: '128GB',
    capacityAvailable: ['128GB'],
    image: 'img/figma/new-iphone-14-plus-red.png',
    images: ['img/figma/new-iphone-14-plus-red.png'],
    year: 2022,
    cell: ['GPRS', 'EDGE', 'WCDMA', 'UMTS', 'HSPA', 'LTE', '5G'],
    description: [
      {
        title: 'Big and bright',
        text: [
          'A roomy display, long battery life, and the familiar iPhone 14 ' +
            'experience in a PRODUCT Red finish.',
        ],
      },
    ],
  },
];

const hotPriceCards = [
  {
    itemId: 'apple-iphone-11-pro-max-512gb-midnightgreen',
    name: 'Apple iPhone 11 Pro Max 512GB Midnight Green (iMT9G2FS/A)',
    fullPrice: 1199,
    price: 849,
  },
  {
    itemId: 'apple-iphone-11-pro-max-64gb-gold',
    name: 'Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)',
    fullPrice: 999,
    price: 799,
  },
  {
    itemId: 'apple-iphone-11-256gb-purple',
    name: 'Apple iPhone 11 256GB Purple (iMT9G2FS/A)',
    fullPrice: 859,
    price: 729,
  },
  {
    itemId: 'apple-iphone-11-128gb-red',
    name: 'Apple iPhone 11 128GB (Product) Red (iMT9G2FS/A)',
    fullPrice: 899,
    price: 699,
  },
];

function mergeUniqueProducts(products: Product[]) {
  const productsById = new Map<string, Product>();

  products.forEach(product => {
    productsById.set(product.itemId ?? product.id, product);
  });

  return Array.from(productsById.values());
}

function mergeBrandNewProducts(products: Product[]) {
  return mergeUniqueProducts([...products, ...brandNewProducts]);
}

function getHotPriceProductsFromList(products: Product[]): Product[] {
  return products
    .filter(product => {
      const price = product.price ?? product.priceDiscount ?? 0;

      return product.category === 'phones' && price <= 1930;
    })
    .map(product => {
      const hotPriceCard = hotPriceCards.find(
        card => card.itemId === product.itemId,
      );

      return {
        ...product,
        ...hotPriceCard,
      };
    });
}

export function getBrandNewProducts(products: Product[], limit = 8): Product[] {
  return [...products]
    .sort((a, b) => {
      const discountA =
        (a.fullPrice ?? a.priceRegular ?? 0) -
        (a.price ?? a.priceDiscount ?? 0);
      const discountB =
        (b.fullPrice ?? b.priceRegular ?? 0) -
        (b.price ?? b.priceDiscount ?? 0);

      return discountB - discountA;
    })
    .slice(0, limit);
}

function getProductOverride(productId: string): Partial<Product> | undefined {
  const brandNewProduct = brandNewProducts.find(
    item => item.id === productId || item.itemId === productId,
  );
  const hotPriceCard = hotPriceCards.find(card => card.itemId === productId);

  return brandNewProduct ?? hotPriceCard;
}

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }

  return response.json();
}

function normalizeAssetPath(path = '') {
  if (!path || path.startsWith('http')) {
    return path;
  }

  return getAssetPath(path);
}

function normalizeProductImages(product: Product): Product {
  return {
    ...product,
    image: normalizeAssetPath(product.image),
    images: product.images?.map(normalizeAssetPath),
  };
}

export async function fetchListProducts(): Promise<Product[]> {
  const products = await fetchJson<Product[]>(listFile);

  return mergeBrandNewProducts(products).map(normalizeProductImages);
}

export async function fetchListProductsByCategory(
  category: Category,
): Promise<Product[]> {
  const products = await fetchListProducts();
  const categoryProducts = products.filter(
    product => product.category === category,
  );
  const categoryFeaturedProducts = getBrandNewProducts(products).filter(
    product => product.category === category,
  );
  const categoryHotPriceProducts = getHotPriceProductsFromList(products).filter(
    product => product.category === category,
  );

  return mergeUniqueProducts([
    ...categoryProducts,
    ...categoryFeaturedProducts,
    ...categoryHotPriceProducts,
  ]);
}

export async function fetchProductDetails(
  productId: string,
): Promise<Product | undefined> {
  const allDetails = await Promise.all(
    Object.values(categoryFiles).map(path => fetchJson<Product[]>(path)),
  );

  const product = allDetails
    .flat()
    .find(item => item.id === productId || item.itemId === productId);
  const productOverride = getProductOverride(productId);

  return product || productOverride
    ? normalizeProductImages({ ...product, ...productOverride } as Product)
    : undefined;
}

export async function getHotPriceProducts(): Promise<Product[]> {
  const products = await fetchListProducts();

  return getHotPriceProductsFromList(products);
}

export async function getSuggestedProducts(
  productId: string,
  limit = 4,
): Promise<Product[]> {
  const allProducts = await fetchListProducts();
  const candidates = allProducts.filter(
    product => product.itemId !== productId && product.id !== productId,
  );
  const shuffled = candidates.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, Math.min(limit, shuffled.length));
}

export function sortProducts(
  products: Product[],
  sortOrder: string,
): Product[] {
  if (sortOrder === 'age') {
    return [...products].sort((a, b) => {
      const yearA = a.year ?? 0;
      const yearB = b.year ?? 0;

      return yearB - yearA;
    });
  }

  if (sortOrder === 'title') {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortOrder === 'price') {
    return [...products].sort((a, b) => {
      const priceA = a.price ?? a.priceDiscount ?? a.priceRegular ?? 0;
      const priceB = b.price ?? b.priceDiscount ?? b.priceRegular ?? 0;

      return priceA - priceB;
    });
  }

  return products;
}

export function filterProductsByQuery(
  products: Product[],
  query: string,
): Product[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (!words.length) {
    return products;
  }

  return products.filter(item => {
    const price = item.price ?? item.priceDiscount ?? item.priceRegular ?? '';
    const searchable = [
      item.name,
      item.id,
      item.itemId,
      item.color,
      item.capacity,
      item.category,
      item.screen,
      item.ram,
      price.toString(),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return words.every(word => searchable.includes(word));
  });
}

export function getHotProducts(products: Product[], limit = 6): Product[] {
  return [...products]
    .sort((a, b) => {
      const discountA =
        (a.fullPrice ?? a.priceRegular ?? 0) -
        (a.price ?? a.priceDiscount ?? 0);
      const discountB =
        (b.fullPrice ?? b.priceRegular ?? 0) -
        (b.price ?? b.priceDiscount ?? 0);

      return discountB - discountA;
    })
    .slice(0, limit);
}

export function getNewestProducts(products: Product[], limit = 6): Product[] {
  return [...products]
    .sort((a, b) => {
      const yearA = a.year ?? 0;
      const yearB = b.year ?? 0;

      return yearB - yearA;
    })
    .slice(0, limit);
}

export function getShopByCategory(): Array<{
  label: string;
  path: string;
  category: Category;
}> {
  return [
    { label: 'Mobile phones', path: '/phones', category: 'phones' },
    { label: 'Tablets', path: '/tablets', category: 'tablets' },
    { label: 'Accessories', path: '/accessories', category: 'accessories' },
  ];
}
