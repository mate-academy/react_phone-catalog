import { ProductDetails } from '../../types';
import { normalizeColor } from '../../utils';

type VariantChange = { color: string } | { capacity: string };

const hasSameColor = (variant: ProductDetails, color: string) =>
  normalizeColor(variant.color) === normalizeColor(color);

export const findVariant = (
  variants: ProductDetails[],
  current: ProductDetails,
  change: VariantChange,
) => {
  const color = 'color' in change ? change.color : current.color;
  const capacity = 'capacity' in change ? change.capacity : current.capacity;

  const exactVariant = variants.find(
    variant => hasSameColor(variant, color) && variant.capacity === capacity,
  );

  if (exactVariant) {
    return exactVariant;
  }

  return variants.find(variant =>
    'color' in change
      ? hasSameColor(variant, color)
      : variant.capacity === capacity,
  );
};
