import type { TFunction } from 'i18next';

import { Category } from '@/shared/types/Category';
import type { Accessory } from '@/shared/types/Accessory';
import type { Phone } from '@/shared/types/Phone';
import type { Tablet } from '@/shared/types/Tablet';

export const getProductSpecs = (
  product: Phone | Tablet | Accessory,
  t: TFunction,
) => {
  const commonSpecs = [
    { specName: t('specScreen'), specText: product.screen },
    { specName: t('specResolution'), specText: product.resolution },
    { specName: t('specProcessor'), specText: product.processor },
    { specName: t('specRam'), specText: product.ram },
  ];

  switch (product.category) {
    case Category.PHONES:
      return [
        ...commonSpecs,
        { specName: t('specCamera'), specText: product.camera },
        { specName: t('specZoom'), specText: product.zoom },
        { specName: t('specCell'), specText: product.cell.join(', ') },
      ];

    case Category.TABLETS:
      return [
        ...commonSpecs,
        { specName: t('specCamera'), specText: product.camera },
        { specName: t('specZoom'), specText: product.zoom },
      ];

    case Category.ACCESSORIES:
      return [
        ...commonSpecs,
        { specName: t('specColor'), specText: product.color },
      ];
  }
};
