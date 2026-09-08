import {
  Address,
  ModifiedData,
  StreetAddress,
  Warehouse,
} from '../modules/shared/Types/novaPostTypes';

export const searchSettlementByQuery = (
  cityName: string,
  limit = '100',
  page = '1',
) => {
  return {
    apiKey: '',
    modelName: 'AddressGeneral',
    calledMethod: 'searchSettlements',
    methodProperties: {
      CityName: cityName,
      Limit: limit,
      Page: page,
    },
  };
};

export const getWarehouses = (cityRef: string, findByQuery = '') => {
  return {
    apiKey: '',
    modelName: 'AddressGeneral',
    calledMethod: 'getWarehouses',
    methodProperties: {
      FindByString: findByQuery,
      CityName: '',
      CityRef: cityRef,
      Page: '1',
      Limit: '150',
      Language: 'UA',
      TypeOfWarehouseRef: '',
      WarehouseId: '',
    },
  };
};

export const getStreets = (cityRef: string, findByQuery = '') => {
  return {
    apiKey: '',
    modelName: 'AddressGeneral',
    calledMethod: 'getStreet',
    methodProperties: {
      CityRef: cityRef,
      FindByString: findByQuery,
      Page: '1',
      Limit: '100',
    },
  };
};

export function serviceModifiedData(
  list: Address[] | Warehouse[] | StreetAddress[],
): ModifiedData[] {
  return list?.map(item => {
    const newItem: ModifiedData = { description: '', ref: '' };

    if ('Present' in item && 'Warehouses' in item) {
      newItem.description = item.Present;
      newItem.ref = item.DeliveryCity;
    } else if ('StreetsTypeRef' in item) {
      newItem.description = item.StreetsType + ' ' + item.Description;
      newItem.ref = item.StreetsTypeRef;
    } else {
      newItem.description = item.Description;
      newItem.ref = item.Ref;
    }

    return newItem;
  });
}
