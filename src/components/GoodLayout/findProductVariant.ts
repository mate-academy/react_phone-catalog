import { Goods } from '../../types/Goods';

export const findProductVariant = (
  goods: Goods[],
  color?: string,
  capacity?: string,
) =>
  goods.find(
    g =>
      (color ? g.color === color : true) &&
      (capacity ? g.capacity === capacity : true),
  )?.id;
