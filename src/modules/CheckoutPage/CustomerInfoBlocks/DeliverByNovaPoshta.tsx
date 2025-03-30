/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { InputField } from '../../shared/Shared_Components/InputFields/InputField';
import { fetchNovaPostData } from '../../../utils/fetchNovaPost';
import {
  getWarehouses,
  serviceModifiedData,
} from '../../../utils/getMethodsOfNovaPost';
import {
  ModifiedData,
  ReceivedData,
  Warehouse,
} from '../../shared/Types/novaPostTypes';
import { SearchData } from '../../shared/Shared_Components/ProductPage/types/types';
import { InputLoader } from '../../shared/Shared_Components/InputFields/InputLoader/InputLoader';
import { PlainInputField } from '../../shared/Shared_Components/InputFields/plainInputField/PlainInputField';
import { InputType } from '../../shared/Shared_Components/InputFields/inputTypes';
import { CheckoutContext } from '../../../Store/CheckoutStore';

interface Props {
  searchRef: string;
  isLoadingCities: boolean;
}

export const DeliverByNovaPoshta: React.FC<Props> = ({
  searchRef,
  isLoadingCities,
}) => {
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);

  const [searchWarehouse, setSearchWareHouse] = useState<SearchData>({
    searchQuery: '',
    searchRef: '',
  });
  const [warehouseData, setWarehouseData] = useState<ModifiedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onWarehouseSelect = (warehouse: SearchData) => {
    setSearchWareHouse(warehouse);
    setCheckoutData({ ...checkoutData, deliverTo: warehouse.searchQuery });
  };

  const onInputChange = (keyToChange: string) => {
    return (data: string) => {
      setCheckoutData({ ...checkoutData, [keyToChange]: data });
    };
  };

  useEffect(() => {
    if (searchRef.length) {
      setIsLoading(true);

      fetchNovaPostData<ReceivedData<Warehouse>>(
        getWarehouses(searchRef, searchWarehouse.searchQuery),
        'POST',
      )
        .then(val => {
          return val.errors.length
            ? setWarehouseData(serviceModifiedData([]))
            : setWarehouseData(serviceModifiedData(val.data));
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchRef, searchRef.length, searchWarehouse.searchQuery]);

  return (
    <div className="checkout__delivery-by-service">
      <div className="checkout__inputs-top">
        <PlainInputField
          title="First Name"
          inputType={InputType.Text}
          initialValue={checkoutData.firstName}
          onChangeHandler={onInputChange('firstName')}
        />

        <PlainInputField
          title="Last Name"
          inputType={InputType.Text}
          initialValue={checkoutData.lastName}
          onChangeHandler={onInputChange('lastName')}
        />
      </div>

      <div className="checkout__inputs-bottom">
        {!isLoadingCities ? (
          <InputField
            title="Warehouse"
            searchData={searchWarehouse}
            isLoading={isLoading}
            setSearchData={onWarehouseSelect}
            listOfItems={warehouseData}
          />
        ) : (
          <InputLoader title="Warehouse" />
        )}
      </div>
    </div>
  );
};
