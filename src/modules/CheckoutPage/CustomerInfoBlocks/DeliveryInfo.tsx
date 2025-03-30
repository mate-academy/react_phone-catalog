/* eslint-disable max-len */
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { DeliverByNovaPoshta } from './DeliverByNovaPoshta';
import { DeliverToAddress } from './DeliverToAddress';
import { InputField } from '../../shared/Shared_Components/InputFields/InputField';
import { SearchData } from '../../shared/Shared_Components/ProductPage/types/types';
import {
  ModifiedData,
  ReceivedData,
  Settlement,
} from '../../shared/Types/novaPostTypes';
import {
  searchSettlementByQuery,
  serviceModifiedData,
} from '../../../utils/getMethodsOfNovaPost';
import { fetchNovaPostData } from '../../../utils/fetchNovaPost';
import { CheckoutContext } from '../../../Store/CheckoutStore';
import { DeliveryMethod } from '../../shared/Types/types';
import { ErrorMessage } from '../../shared/ErrorMassages/ErrorMessage';
import { CheckoutErrorsContext } from '../../../Store/CheckoutErrorStore';

export const DeliveryInfo = () => {
  const { checkoutData, setCheckoutData } = useContext(CheckoutContext);
  const { errors } = useContext(CheckoutErrorsContext);
  const [searchData, setSearchData] = useState<SearchData>({
    searchQuery: '',
    searchRef: '',
  });
  const [citiesData, setCitiesData] = useState<ModifiedData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onCitySelectHandler = (cityData: SearchData) => {
    setSearchData(cityData);

    setCheckoutData({ ...checkoutData, deliveryCity: cityData.searchQuery });
  };

  const errorTitle =
    'Please, select delivery method and fill all required blanks in the section below!';

  useEffect(() => {
    if (searchData.searchQuery) {
      setIsLoading(true);

      fetchNovaPostData<ReceivedData<Settlement>>(
        searchSettlementByQuery(searchData.searchQuery),
        'POST',
      )
        .then(data => {
          const listOfAddresses = data.errors.length
            ? []
            : data.data[0]?.Addresses;

          setCitiesData(serviceModifiedData(listOfAddresses));
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchData.searchQuery]);

  return (
    <div className="checkout__customer-info">
      <h2 className="title title--h2 checkout__text">Delivery</h2>

      {errors.deliveryInfo && <ErrorMessage title={errorTitle} />}

      <div className="checkout__delivery-info">
        <h4 className="title title--h4">
          Please, make sure you use ukrainian letters (ex. copy-paste:
          Хмельницький)
        </h4>

        <InputField
          title="City"
          searchData={searchData}
          isLoading={isLoading}
          setSearchData={onCitySelectHandler}
          listOfItems={citiesData}
        />

        <div
          className={classNames('checkout__deliver-by-container', {
            'checkout__deliver-by-container--is-Active':
              checkoutData.deliveryMethod === DeliveryMethod.ByNP,
          })}
          onClick={() =>
            setCheckoutData({
              ...checkoutData,
              deliveryMethod: DeliveryMethod.ByNP,
            })
          }
        >
          <div className="checkout__delivery-banner">
            <div className="checkout__deliver-top">
              <div
                className={classNames('checkout__delivery-image', {
                  'checkout__delivery-image--is-Active':
                    checkoutData.deliveryMethod === DeliveryMethod.ByNP,
                })}
              />
            </div>

            <div className="checkout__deliver-bottom">
              <div className="checkout__delivery-titles">
                <h3 className="title title--h3">To Nova Post Warehouse</h3>

                <p className="body-text">
                  Estimated arrival: 1-3 business days
                </p>
              </div>

              <p className="title title--h4 checkout__total-text checkout__total-text--free">
                Free
              </p>
            </div>
          </div>

          {checkoutData.deliveryMethod === DeliveryMethod.ByNP && (
            <DeliverByNovaPoshta
              searchRef={searchData.searchRef}
              isLoadingCities={isLoading}
            />
          )}
        </div>

        <div
          className={classNames('checkout__deliver-by-container', {
            'checkout__deliver-by-container--is-Active':
              checkoutData.deliveryMethod === DeliveryMethod.ToAddress,
          })}
          onClick={() =>
            setCheckoutData({
              ...checkoutData,
              deliveryMethod: DeliveryMethod.ToAddress,
            })
          }
        >
          <div className="checkout__delivery-banner">
            <div className="checkout__deliver-top">
              <div
                className={classNames('checkout__delivery-image', {
                  'checkout__delivery-image--is-Active':
                    checkoutData.deliveryMethod === DeliveryMethod.ToAddress,
                })}
              />
            </div>

            <div className="checkout__deliver-bottom">
              <div className="checkout__delivery-titles">
                <h3 className="title title--h3">Delivery by Address</h3>

                <p className="body-text">
                  Estimated arrival: 1-3 business days
                </p>
              </div>

              <p className="title title--h4 checkout__total-text checkout__total-text--free">
                Free
              </p>
            </div>
          </div>

          {checkoutData.deliveryMethod === DeliveryMethod.ToAddress && (
            <DeliverToAddress
              searchRef={searchData.searchRef}
              isLoadingCities={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};
