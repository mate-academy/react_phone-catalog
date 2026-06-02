export interface PhoneDetail {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: Array<{
    title: string;
    text: string[];
  }>;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

export interface Product {
  id: number;
  category: 'phones' | 'tablets' | 'accessories';
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface ProductCard {
  id: string;
  itemId: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  rating: number;
  reviewCount: number;
  isFavorite?: boolean;
  screen?: string;
  capacity?: string;
  ram?: string;
  category: 'phones' | 'tablets' | 'accessories';
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  description?: string;
}

export interface HomePageData {
  banners: Banner[];
  newProducts: ProductCard[];
  hotPrices: ProductCard[];
}

// ============ API FUNCTIONS ============

// Загрузить все продукты из products.json
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('api/products.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    const data = JSON.parse(text);

    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
    }

    return [];
  }
};

// Загрузить все телефоны (детали) из phones.json

export const getAllPhones = async (): Promise<PhoneDetail[]> => {
  try {
    const response = await fetch('api/phones.json');

    if (!response.ok) {
      throw new Error('Failed to fetch phones');
    }

    return await response.json();
  } catch (error) {
    return [];
  }
};

// Загрузить все планшеты из tablets.json

export const getAllTablets = async (): Promise<PhoneDetail[]> => {
  try {
    const response = await fetch('api/tablets.json');

    if (!response.ok) {
      throw new Error('Failed to fetch tablets');
    }

    return await response.json();
  } catch (error) {
    return [];
  }
};

// Загрузить все аксессуары из accessories.json

export const getAllAccessories = async (): Promise<PhoneDetail[]> => {
  try {
    const response = await fetch('api/accessories.json');

    if (!response.ok) {
      throw new Error('Failed to fetch accessories');
    }

    return await response.json();
  } catch (error) {
    return [];
  }
};

// Получить продукт по ID (itemId)

export const getProductById = async (
  itemId: string,
): Promise<Product | undefined> => {
  const products = await getAllProducts();

  return products.find(p => p.itemId === itemId);
};

// Получить детали телефона по ID

export const getPhoneById = async (
  id: string,
): Promise<PhoneDetail | undefined> => {
  const phones = await getAllPhones();

  return phones.find(p => p.id === id);
};

// Конвертировать Product в ProductCard (для слайдеров)

const convertToProductCard = (product: Product): ProductCard => {
  const discount = product.fullPrice - product.price;

  return {
    id: product.itemId,
    itemId: product.itemId,
    name: product.name,
    price: product.price,
    discount: discount,
    image: product.image,
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: Math.floor(Math.random() * 200) + 50,
    isFavorite: false,
    screen: product.screen,
    capacity: product.capacity,
    ram: product.ram,
    category: product.category,
  };
};

// Получить продукты для HomePage (новые модели)
// Берём самые новые по году выпуска

export const getNewProducts = async (): Promise<ProductCard[]> => {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return [];
    }

    const sorted = [...products].sort((a, b) => b.year - a.year);

    return sorted.slice(0, 12).map(convertToProductCard);
  } catch (error) {
    return [];
  }
};

// Получить продукты для HomePage (горячие цены)
// Берём товары с наибольшей скидкой

export const getHotPrices = async (): Promise<ProductCard[]> => {
  try {
    const products = await getAllProducts();

    if (products.length === 0) {
      return [];
    }

    const withDiscount = products
      .filter(p => p.fullPrice > p.price)
      .map(p => ({
        ...p,
        discountPercent: ((p.fullPrice - p.price) / p.fullPrice) * 100,
      }))
      .sort((a, b) => a.discountPercent - b.discountPercent);

    return withDiscount.slice(0, 12).map(p => convertToProductCard(p));
  } catch (error) {
    return [];
  }
};

// Получить баннеры для HomePage

export const getBanners = async (): Promise<Banner[]> => {
  try {
    return [
      {
        id: '1',
        image: 'img/banner-phones.png',
        title: 'Latest Phones',
        description: 'Check out the newest models',
      },
      {
        id: '2',
        image: 'img/banner-tablets.png',
        title: 'Tablets',
        description: 'Powerful and portable',
      },
      {
        id: '3',
        image: 'img/banner-accessories.png',
        title: 'Accessories',
        description: 'Complete your setup',
      },
    ];
  } catch (error) {
    return [];
  }
};

// Загрузить данные для HomePage (баннеры + новые + горячие)

export const getHomePageData = async (): Promise<HomePageData> => {
  try {
    const [banners, newProducts, hotPrices] = await Promise.all([
      getBanners(),
      getNewProducts(),
      getHotPrices(),
    ]);

    return {
      banners,
      newProducts,
      hotPrices,
    };
  } catch (error) {
    throw error;
  }
};

// Получить продукты по категории

export const getProductsByCategory = async (
  category: 'phones' | 'tablets' | 'accessories',
): Promise<Product[]> => {
  try {
    const products = await getAllProducts();

    return products.filter(p => p.category === category);
  } catch (error) {
    return [];
  }
};
