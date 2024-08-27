import { AccessorySpecs } from './AccessorySpecs';
import { PhoneSpecs } from './PhoneSpecs';
import { ProductSummary } from './ProductSummary';
import { TabletSpecs } from './TabletSpecs';

export interface States {
  accessories: AccessorySpecs[];
  phones: PhoneSpecs[];
  tablets: TabletSpecs[];
  products: ProductSummary[];
}
