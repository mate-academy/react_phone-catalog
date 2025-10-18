import { Status } from '@features/index';
import { Product } from '@shared/types';
import { Conf } from './types';
import { apiToUiMapper } from './dataToUiMappers';

const baseDetailList = {
  [apiToUiMapper.screen]: null,
  [apiToUiMapper.resolution]: null,
  [apiToUiMapper.processor]: null,
  [apiToUiMapper.ram]: null,
};

export const organizeProps = (prod: Product | Status) => {
  const conf: Conf = {
    breadcrumbs: undefined,
    h1: 'Loading...',

    uiProps: {
      slider: Status.LOADING,
      SKU: 'ID: 424242',
      optionsData: Status.LOADING,
      purchaseData: Status.LOADING,
      baseDetailedList: baseDetailList,
    },

    infoProps: {
      description: null,
      extendedDetailedList: {
        ...baseDetailList,
        [apiToUiMapper.capacity]: null,
      },
    },
  };

  if (prod === Status.LOADING || prod === Status.ERROR) {
    return conf;
  }

  conf.breadcrumbs = [
    {
      name: prod.category,
      to: prod.category,
    },
    {
      name: prod.name,
      to: `/products/${prod.id}`,
    },
  ];

  conf.uiProps.slider = { images: prod.images, name: prod.name };
  conf.h1 = prod.name;
  conf.uiProps.optionsData = {
    arrays: [
      { options: prod.colorsAvailable, active: prod.color },
      { options: prod.capacityAvailable, active: prod.capacity },
    ],
    link: [prod.namespaceId, prod.capacity.toLowerCase(), prod.color],
  };
  conf.uiProps.purchaseData = {
    priceRegular: prod.priceRegular,
    ...(prod.priceDiscount && { priceDiscount: prod.priceDiscount }),
    id: prod.id,
  };
  conf.uiProps.baseDetailedList = {
    [apiToUiMapper.screen]: prod.screen,
    [apiToUiMapper.resolution]: prod.resolution,
    [apiToUiMapper.processor]: prod.processor,
    [apiToUiMapper.ram]: prod.ram,
  };
  conf.infoProps = {
    description: prod.description,
    extendedDetailedList: {
      ...conf.uiProps.baseDetailedList,
      [apiToUiMapper.capacity]: prod.capacity,
      ...(prod.camera && { [apiToUiMapper.camera]: prod.camera }),
      ...(prod.zoom && { [apiToUiMapper.zoom]: prod.zoom }),
      ...(prod.cell && { [apiToUiMapper.cell]: prod.cell.join(', ') }),
    },
  };

  return conf;
};
