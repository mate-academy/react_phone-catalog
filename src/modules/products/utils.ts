import { colornames } from 'color-name-list';
import z from 'zod';

import { specialColors } from '@/modules/products/constants';

export const parseParamsBySchemaFromSearchParams = <T>(
  searchParams: URLSearchParams,
  schema: z.ZodType<T>,
): T => {
  const result = schema.safeParse(Object.fromEntries(searchParams));

  if (!result.success) {
    // eslint-disable-next-line no-console
    console.error(result.error.issues);

    return schema.parse({});
  }

  return result.data;
};

const normalizeColorName = (name: string) =>
  name.toLowerCase().replace(/[\s-_]/g, '');

export const getColorHex = (name: string): string => {
  const normalizedName = normalizeColorName(name);

  if (specialColors[normalizedName]) {
    return specialColors[normalizedName];
  }

  const color = colornames.find(
    item => normalizeColorName(item.name) === normalizedName,
  );

  return color?.hex ?? '#FFFFFF';
};
