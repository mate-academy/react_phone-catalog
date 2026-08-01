import { ProductDetails } from '@shared/types';
import { TranslationKey } from '@shared/i18n';

export interface Spec {
  labelKey: TranslationKey;
  value: string;
}

export const getShortSpecs = (details: ProductDetails): Spec[] => [
  { labelKey: 'specs.screen', value: details.screen },
  { labelKey: 'specs.resolution', value: details.resolution },
  { labelKey: 'specs.processor', value: details.processor },
  { labelKey: 'specs.ram', value: details.ram },
];

export const getFullSpecs = (details: ProductDetails): Spec[] => {
  const specs = [
    ...getShortSpecs(details),
    {
      labelKey: 'specs.builtInMemory' as TranslationKey,
      value: details.capacity,
    },
    { labelKey: 'specs.camera' as TranslationKey, value: details.camera },
    { labelKey: 'specs.zoom' as TranslationKey, value: details.zoom },
    {
      labelKey: 'specs.cell' as TranslationKey,
      value: details.cell.join(', '),
    },
  ];

  // Accessories have no camera or zoom.
  return specs.filter((spec): spec is Spec => Boolean(spec.value));
};

/**
 * Finds the same model in another color or capacity. Ids cannot be built from
 * the parts by hand — a few of them do not follow the usual naming.
 */
export const findVariantId = (
  variants: ProductDetails[],
  current: ProductDetails,
  change: Partial<Pick<ProductDetails, 'color' | 'capacity'>>,
): string | null => {
  const wanted = {
    color: current.color,
    capacity: current.capacity,
    ...change,
  };

  const variant = variants.find(
    item => item.color === wanted.color && item.capacity === wanted.capacity,
  );

  return variant?.id ?? null;
};
