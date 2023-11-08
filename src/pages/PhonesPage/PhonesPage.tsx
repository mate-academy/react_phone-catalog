import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { PagePath } from '../../components/PagePath/PagePath';
import { CatalogProduct } from '../../types/CatalogProduct';
import { getProducts } from '../../utils/fetchData';
import { getCurrentProductList } from '../../helpers/pagesMethods';
import { SortBySelect } from '../../components/SortBySelect/SortBySelect';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { NoSearchResult } from '../../components/NoSearchResult/NoSearchResult';
import { LoadMore } from '../../components/LoadMore/LoadMore';

export const PhonesPage: FC = () => {
  const [phonesList, setPhonesList] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialised, setIsInitialised] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [currentPhonesList, setCurrentPhonesList]
    = useState<CatalogProduct[]>([]);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const query = searchParams.get('query') || '';
  const previousPage = searchParams.get('previousPage') || '8';
  const page = searchParams.get('page') || '1';

  const location = useLocation();

  const navigate = useNavigate();

  const handleLoading = async () => {
    try {
      setIsLoading(true);

      const productFromServer = await getProducts();

      const phones = productFromServer
        .filter(product => product.category === 'phones');

      const currentList = getCurrentProductList(
        phones,
        sort,
        query,
        previousPage,
        page,
        setPaginationTotal,
      );

      setPhonesList(phones);
      setCurrentPhonesList(currentList);
      setIsInitialised(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate('/notfound');
    }
  };

  useEffect(() => {
    if (!isInitialised) {
      handleLoading();
    }

    if (isInitialised) {
      setIsLoading(true);

      const currentList = getCurrentProductList(
        phonesList,
        sort,
        query,
        previousPage,
        page,
        setPaginationTotal,
      );

      setCurrentPhonesList(currentList);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [location]);

  return (
    <div className="products__page">
      <PagePath url="/phones" title="Phones" />

      <h1>Mobile phones</h1>

      {isInitialised && phonesList.length && (
        <>
          <p className="products-page__total-amount">
            {`${phonesList.length} models`}
          </p>

          <div className="products-page__selectors selectors">
            <SortBySelect />

            {/* <ItemsOnPageSelect /> */}
          </div>
        </>
      )}

      {isLoading && (
        <Loader />
      )}

      {!isLoading && currentPhonesList.length ? (
        <>
          <ProductsList
            products={currentPhonesList}
            isSlider={false}
          />

          {(currentPhonesList.length < phonesList.length) && (
            <>
              <LoadMore
                productsList={phonesList}
                currentProducsList={currentPhonesList}
                setCurrentProductsList={setCurrentPhonesList}
                total={paginationTotal}
              />
            </>
          )}
        </>
      ) : (isLoading && (
        <NoSearchResult />
      ))}
    </div>
  );
};
