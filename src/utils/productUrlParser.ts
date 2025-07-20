import { ALL_CAPACITIES, ALL_COLORS } from '../constants/productConstants';

interface ParsedUrlInfo {
  effectiveNamespaceId: string;
  initialSelectedCapacity: string | null;
  initialSelectedColor: string | null;
}

export const parseProductUrl = (
  itemId: string | undefined,
  searchParams: URLSearchParams,
): ParsedUrlInfo => {
  let effectiveNamespaceId = itemId || '';
  let parsedCapacity: string | null = null;
  let parsedColor: string | null = null;

  if (itemId) {
    const segments = itemId.split('-');
    const tempNamespaceSegments: string[] = [];

    let capacityFoundInSegments = false;
    let colorFoundInSegments = false;

    for (let i = segments.length - 1; i >= 0; i--) {
      const segment = segments[i].toLowerCase();

      if (!capacityFoundInSegments) {
        const foundCapacity = ALL_CAPACITIES.find(
          (cap) => cap.toLowerCase() === segment,
        );
        if (foundCapacity) {
          parsedCapacity = foundCapacity;
          capacityFoundInSegments = true;
          continue;
        }
      }

      if (!colorFoundInSegments) {
        const foundColor = ALL_COLORS.find(
          (col) => col.toLowerCase() === segment,
        );
        if (foundColor) {
          parsedColor = foundColor;
          colorFoundInSegments = true;
          continue;
        }
      }
      tempNamespaceSegments.unshift(segment);
    }
    effectiveNamespaceId = tempNamespaceSegments.join('-');
  }

  const searchParamCapacity = searchParams.get('capacity');
  const searchParamColor = searchParams.get('color');

  return {
    effectiveNamespaceId: effectiveNamespaceId,
    initialSelectedCapacity: parsedCapacity || searchParamCapacity,
    initialSelectedColor: parsedColor || searchParamColor,
  };
};
