import { fetchPhoneDetails } from '@/api/phoneDetails';
import { fetchTabletDetails } from '@/api/tabletDetails';
import { fetchAccessoriesDetails } from '@/api/accessoriesDetails';
import { ProductDetails } from '@/features/products/types/productDetails';

type CategoryConfig = {
  titleKey: string;
  fetchDetails: () => Promise<ProductDetails[]>;
};

export const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  phones: {
    titleKey: 'categories.phones',
    fetchDetails: fetchPhoneDetails,
  },
  tablets: {
    titleKey: 'categories.tablets',
    fetchDetails: fetchTabletDetails,
  },
  accessories: {
    titleKey: 'categories.accessories',
    fetchDetails: fetchAccessoriesDetails,
  },
};
