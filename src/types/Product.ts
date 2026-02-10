/* eslint-disable @typescript-eslint/indent */

export type Description = {
  title: string;
  text: string[];
};

export type Variants = {
  [key: string]: string[];
};

export type Specs = {
  capacityAvailable: string[];
  capacity: string;
  colorsAvailable: string[];
  color: string;
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera?: string;
  zoom?: string;
  cell: string[];
};

export type Product = {
  id: string;
  categoryId: string;
  name: string;
  namespaceId: string;
  year: number;
  quantity?: number;
  fullPrice: number;
  discountPrice: number;
  description: Description[];
  images: string[];
  specs: Specs;
  avaiableVariants: Variants;
};
