import { z } from 'zod';

import { PRODUCT_SORT_KEYS } from '@/modules/products/constants';

export const productItemSchema = z.object({
  id: z.number().int(),
  category: z.enum(['phones', 'tablets', 'accessories']),
  itemId: z.string(),
  name: z.string(),
  fullPrice: z.number().int(),
  price: z.number().int(),
  screen: z.string(),
  capacity: z.string(),
  color: z.string(),
  ram: z.string(),
  year: z.number().min(1970),
  image: z.string(),
});

export const productPageSchema = z.object({
  items: z.array(productItemSchema),
  total: z.number().int().min(0),
  page: z.number().int().min(1),
  perPage: z.union([z.coerce.number().int().min(1).max(100), z.literal('all')]),
  totalPages: z.number().int().min(0),
});

export const productListParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  perPage: z
    .union([z.coerce.number().int().min(1).max(100), z.literal('all')])
    .default('all'),
  sort: z.enum(PRODUCT_SORT_KEYS).optional(),
  //category: z.enum(['phones', 'tablets', 'accessories']),
  //search_str: z.string().optional(),
});

export type ProductItem = z.infer<typeof productItemSchema>;
export type ProductPage = z.infer<typeof productPageSchema>;
export type ProductListParams = z.infer<typeof productListParamsSchema>;

export const deviceDescriptionSchema = z.object({
  title: z.string(),
  text: z.array(z.string()),
});

export const deviceSchema = z.object({
  id: z.string(),
  namespaceId: z.string(),
  category: z.enum(['phones', 'tablets', 'accessories']),
  name: z.string(),
  capacityAvailable: z.array(z.string()),
  capacity: z.string(),
  priceRegular: z.number(),
  priceDiscount: z.number(),
  colorsAvailable: z.array(z.string()),
  color: z.string(),
  images: z.array(z.string()),
  description: z.array(deviceDescriptionSchema),
  screen: z.string(),
  resolution: z.string(),
  processor: z.string(),
  ram: z.string(),
  cell: z.array(z.string()),
  camera: z.string().optional(),
  zoom: z.string().optional(),
});

export type Device = z.infer<typeof deviceSchema>;
