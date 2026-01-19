import { Accessory } from '../types/Accessory';
import { Goods } from '../types/Goods';
import { Phone } from '../types/Phone';
// import { CartProduct, Product } from '../types/Product';
import { ProductCategory } from '../types/ProductCategory';
import { SpecsMap } from '../types/SpecsMap';
import { Tablet } from '../types/Tablet';

const pickSpecs = (specs: SpecsMap, allowedKeys: string[]): SpecsMap =>
  Object.fromEntries(
    Object.entries(specs).filter(([key]) => allowedKeys.includes(key)),
  );

export const getPhoneSpecs = (phone: Phone): SpecsMap => ({
  screen: phone.screen,
  resolution: phone.resolution,
  processor: phone.processor,
  ram: phone.ram,
  camera: phone.camera,
  zoom: phone.zoom,
  cell: phone.cell,
});

export const getAccessorySpecs = (accessory: Accessory): SpecsMap => ({
  screen: accessory.screen,
  resolution: accessory.resolution,
  processor: accessory.processor,
  ram: accessory.ram,
  cell: accessory.cell,
});

export const getTabletSpecs = (tablet: Tablet): SpecsMap => ({
  screen: tablet.screen,
  resolution: tablet.resolution,
  processor: tablet.processor,
  ram: tablet.ram,
  camera: tablet.camera,
  zoom: tablet.zoom,
  cell: tablet.cell,
});

export const getSpecsByGood = (good: Goods, isFast = false): SpecsMap => {
  switch (good.category) {
    case ProductCategory.phones: {
      const specs = getPhoneSpecs(good);

      return isFast
        ? pickSpecs(specs, ['screen', 'processor', 'ram', 'resolution'])
        : specs;
    }

    case ProductCategory.tablets: {
      const specs = getTabletSpecs(good);

      return isFast ? pickSpecs(specs, ['screen', 'processor', 'ram']) : specs;
    }

    case ProductCategory.accessories: {
      const specs = getAccessorySpecs(good);

      return isFast ? pickSpecs(specs, ['cell']) : specs;
    }

    default:
      return {};
  }
};
