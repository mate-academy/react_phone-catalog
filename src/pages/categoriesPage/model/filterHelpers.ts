import { BaseProduct } from '@shared/types/APITypes';
import { Order } from '@shared/types/filterEnums';

function sortFilter(dataset: BaseProduct[], type: Order) {
  switch (type) {
    case Order.Alphabet:
      return [...dataset].sort((a: BaseProduct, b: BaseProduct) =>
        a.name.localeCompare(b.name),
      );
    case Order.Cheapest:
      return [...dataset].sort(
        (a: BaseProduct, b: BaseProduct) => a.price - b.price,
      );
    case Order.Newest:
      return [...dataset].sort(
        (a: BaseProduct, b: BaseProduct) => b.year - a.year,
      );
  }
}

export { sortFilter };
