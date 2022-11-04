import { ProductDetails } from '../types/ProductDetails';

export type Details = {
  option: string;
  value?: string;
}[];

export const smallTechSpecs = (product: ProductDetails) => {
  const techSpecs: Details = [
    { option: 'Screen', value: product?.display.screenSize },
    { option: 'Resolution', value: product?.display.screenResolution },
    { option: 'Processor', value: product?.hardware.cpu.slice(0, 35) },
    { option: 'RAM', value: product?.storage.ram },
  ];

  return techSpecs;
};

export const bigTechSpecs = (product: ProductDetails) => {
  const techSpecs: Details = [
    { option: 'Screen', value: product?.display.screenSize },
    { option: 'Resolution', value: product?.display.screenResolution },
    { option: 'Processor', value: product?.hardware.cpu },
    { option: 'RAM', value: product?.storage.ram },
    { option: 'Memory', value: product?.storage.flash },
    { option: 'Camera', value: product?.camera.primary },
    { option: 'Weight', value: product?.sizeAndWeight.weight },
  ];

  return techSpecs;
};
