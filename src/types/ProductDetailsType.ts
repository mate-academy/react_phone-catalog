import { AccessoriesDetails } from './AccessoriesDetails';
import { PhoneDetails } from './PhoneDetails';
import { Product } from './Product';
import { TabletDetails } from './TabletDetails';

export type ProductDetailsType = {
  basic: Product;
  details: PhoneDetails | TabletDetails | AccessoriesDetails;
};
