import { getAccessories } from '../../api/fetchAccessories';
import { getPhones } from '../../api/fetchPhones';
import { getTablets } from '../../api/fetchTablets';
import type { Gadget } from '../../types/gadgets';

export async function helperToFindProductsByCategory(
  category: string,
): Promise<Gadget[]> {
  switch (category) {
    case 'phones':
      return getPhones();
    case 'tablets':
      return getTablets();
    case 'accessories':
      return getAccessories();
    default:
      return [];
  }
}
