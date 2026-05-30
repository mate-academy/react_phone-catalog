import { useMemo } from 'react';
import { Product } from '../../../../types/Product';
import { ProductDetails } from '../../../../types/ProductDetails';

export type SpecVariant = 'card' | 'short' | 'full';

export const useTechSpecs = (
  product: Product | ProductDetails,
  variant: SpecVariant,
) => {
  const isDetails = 'resolution' in product;

  const validSpecs = useMemo(() => {
    let rawSpecs: { label: string; value: string | number | undefined }[] = [];

    if (variant === 'card') {
      rawSpecs = [
        { label: 'Screen', value: product.screen },
        { label: 'Capacity', value: product.capacity },
        { label: 'RAM', value: product.ram },
      ];
    } else if (variant === 'short' && isDetails) {
      const p = product as ProductDetails;

      rawSpecs = [
        { label: 'Screen', value: p.screen },
        { label: 'Resolution', value: p.resolution },
        { label: 'Processor', value: p.processor },
        { label: 'RAM', value: p.ram },
      ];
    } else if (variant === 'full' && isDetails) {
      const p = product as ProductDetails;

      rawSpecs = [
        { label: 'Screen', value: p.screen },
        { label: 'Resolution', value: p.resolution },
        { label: 'Processor', value: p.processor },
        { label: 'RAM', value: p.ram },
        { label: 'Built in memory', value: p.capacity },
        { label: 'Camera', value: p.camera },
        { label: 'Zoom', value: p.zoom },
        { label: 'Cell', value: p.cell?.join(', ') },
      ];
    }

    return rawSpecs.filter(
      spec =>
        spec.value !== undefined && spec.value !== '' && spec.value !== null,
    );
  }, [product, variant, isDetails]);

  return validSpecs;
};
