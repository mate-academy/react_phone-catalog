import { Product } from '../../types/Product';

export type SliderType = 'brandNew' | 'hotPrices';

export interface SliderConfig {
  id: string;
  type: SliderType;
  titleKey: string; // Translation key
  limit: number; // Number of products to show
  sortFunction: (products: Product[]) => Product[]; // How to sort/filter
  classModifier?: string;
}

/**
 * Sort function for Brand New Models
 * Returns products sorted by year (newest first)
 */
const sortByNewest = (products: Product[]): Product[] => {
  return [...products]
    .sort((a, b) => b.year - a.year) // Sort by year descending
    .slice(0, 15); // Take top 15
};

/**
 * Sort function for Hot Prices
 * Returns products with biggest discount (fullPrice - price)
 */
const sortByDiscount = (products: Product[]): Product[] => {
  return [...products]
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA; // Sort by discount descending
    })
    .slice(0, 15); // Take top 15
};

/**
 * Slider Configurations
 * Define all sliders used in the app
 */
export const Sliders: SliderConfig[] = [
  {
    id: 'brand-new',
    type: 'brandNew',
    titleKey: 'brandNewModels', // Translation key
    limit: 15,
    sortFunction: sortByNewest,
  },
  {
    id: 'hot-prices',
    type: 'hotPrices',
    titleKey: 'hotPrices', // Translation key
    limit: 15,
    sortFunction: sortByDiscount,
    classModifier: '--color-text',
  },
];

/**
 * Get slider configuration by type
 */
export const getSliderConfig = (type: SliderType): SliderConfig | undefined => {
  return Sliders.find(slider => slider.type === type);
};

/**
 * Get products for a specific slider
 */
export const getSliderProducts = (allProducts: Product[], type: SliderType): Product[] => {
  const config = getSliderConfig(type);

  if (!config) {
    return [];
  }

  return config.sortFunction(allProducts);
};
