import { Product } from '@shared/types';

export const getProps = (prod: Product) => {
  const link = [prod.namespaceId, prod.capacity.toLowerCase(), prod.color];

  const breadcrumbList = [
    {
      name: prod.category,
      to: prod.category,
    },
    {
      name: prod.name,
      to: `/products/${prod.id}`,
    },
  ];

  const baseSpecs = {
    screen: prod.screen,
    resolution: prod.resolution,
    processor: prod.processor,
    ram: prod.ram,
  };

  const extendedSpecs = {
    ...baseSpecs,
    capacity: prod.capacity,
    ...(prod.camera && { camera: prod.camera }),
    ...(prod.zoom && { zoom: prod.zoom }),
    ...(prod.cell && { cell: prod.cell }),
  };

  const props = {
    ui: {
      colorsOptions: {
        options: prod.colorsAvailable,
        heading: 'Available colors',
        link: link,
        active: prod.color,
      },
      capacityOptions: {
        options: prod.capacityAvailable,
        heading: 'Select capacity',
        link: link,
        active: prod.capacity,
      },
      purchase: {
        priceRegular: prod.priceRegular,
        priceDiscount: prod.priceDiscount,
        id: prod.id,
        category: prod.category,
      },
      baseSpecs: baseSpecs,
      slider: {
        images: prod.images,
        name: prod.name,
      },
    },

    extendedSpecs: extendedSpecs,
    breadcrumbs: {
      links: breadcrumbList,
    },
  };

  return props;
};
