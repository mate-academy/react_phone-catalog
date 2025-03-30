/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { InputField } from '../../shared/Shared_Components/InputFields/InputField';
import { InputLoader } from '../../shared/Shared_Components/InputFields/InputLoader/InputLoader';
import { InputType } from '../../shared/Shared_Components/InputFields/inputTypes';
import { PlainInputField } from '../../shared/Shared_Components/InputFields/plainInputField/PlainInputField';
import { SearchData } from '../../shared/Shared_Components/ProductPage/types/types';
import {
  ModifiedData,
  ReceivedData,
  StreetAddress,
} from '../../shared/Types/novaPostTypes';
import { fetchNovaPostData } from '../../../utils/fetchNovaPost';
import {
  getStreets,
  serviceModifiedData,
} from '../../../utils/getMethodsOfNovaPost';
import { CheckoutContext } from '../../../Store/CheckoutStore';

interface Props {
  searchRef: string;
  isLoadingCities: boolean;
}

export const DeliverToAddress: React.FC<Props> = ({
  searchRef,
  isLoadingCities,
}) => {
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);
  const [searchStreet, setSearchStreet] = useState<SearchData>({
    searchQuery: '',
    searchRef: '',
  });
  const [streetData, setStreetData] = useState<ModifiedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onStreetSelect = (street: SearchData) => {
    setSearchStreet(street);
    setCheckoutData({ ...checkoutData, deliverTo: street.searchQuery });
  };

  const onInputChange = (keyToChange: string, additional?: string) => {
    return (data: string) => {
      let newValue = { ...checkoutData, [keyToChange]: data };

      if (additional) {
        newValue = {
          ...checkoutData,
          buildingDetails: {
            ...checkoutData.buildingDetails,
            [additional]: data,
          },
        };
      }

      setCheckoutData(newValue);
    };
  };

  useEffect(() => {
    if (searchRef.length) {
      setIsLoading(true);

      fetchNovaPostData<ReceivedData<StreetAddress>>(
        getStreets(searchRef, searchStreet.searchQuery),
        'POST',
      )
        .then(val => {
          return val.errors.length
            ? setStreetData(serviceModifiedData([]))
            : setStreetData(serviceModifiedData(val.data));
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchRef, searchStreet.searchQuery]);

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
          onChangeHandler={onInputChange('firstName')}
        />
      </div>

      <div className="checkout__inputs-bottom">
        {!isLoadingCities ? (
          <InputField
            title="Street"
            searchData={searchStreet}
            isLoading={isLoading}
            setSearchData={onStreetSelect}
            listOfItems={streetData}
          />
        ) : (
          <InputLoader title="Street" />
        )}
      </div>

      <div className="checkout__inputs-top">
        <PlainInputField
          title="Building"
          inputType={InputType.Number}
          initialValue={checkoutData.buildingDetails.building}
          onChangeHandler={onInputChange('buildingDetails', 'building')}
        />

        <PlainInputField
          title="Entrance"
          inputType={InputType.Number}
          initialValue={checkoutData.buildingDetails.entrance}
          onChangeHandler={onInputChange('buildingDetails', 'entrance')}
        />

        <PlainInputField
          title="Apartment"
          inputType={InputType.Number}
          initialValue={checkoutData.buildingDetails.apartment}
          onChangeHandler={onInputChange('buildingDetails', 'apartment')}
        />
      </div>
    </div>
  );
};
