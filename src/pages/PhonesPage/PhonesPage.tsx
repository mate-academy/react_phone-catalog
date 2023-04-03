import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CatalogProduct } from '../../types/CatalogProduct';
import { PagePath } from '../../components/PagePath';
import '../ProductsPage.scss';
import { getProductsList } from '../../helpers/fetchData';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';
import {
  getCurrentProductList,
} from '../../helpers/pagesMethods';
import { SortBySelect } from '../../components/SortBySelect';
import { ItemsOnPageSelect } from '../../components/ItemsOnPageSelect';
import { PaginationPages } from '../../components/PaginationPages';
import { LoadMore } from '../../components/LoadMore';
import { NoSearchResults } from '../../components/NoSearchResults';

export const PhonesPage: FC = () => {
  const [phonesList, setPhonesList] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';

  const [currentPhonesList, setCurrentPhonesList]
    = useState<CatalogProduct[]>([]);

  const navigate = useNavigate();

  const handleLoading = async () => {
    try {
      setIsLoading(true);

      const productsFromServer = await getProductsList();

      const phones = productsFromServer
        .filter((product: CatalogProduct) => product.category === 'phones');

      const currentList = getCurrentProductList(
        phones,
        sort,
        query,
        perPage,
        page,
        setPaginationTotal,
      );

      setPhonesList(phones);
      setCurrentPhonesList(currentList);
      setIsInitialized(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate('/notfound', { replace: true });
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      handleLoading();
    }

    if (isInitialized) {
      setIsLoading(true);

      const currentList = getCurrentProductList(
        phonesList,
        sort,
        query,
        perPage,
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
    <div
      className="
        main__products-page
        main__products-page--width
        products-page
      "
    >
      <PagePath url="/phones" title="Phones" />

      <h1 className="products-page__title page-title">Mobile phones</h1>

      {isInitialized && !!phonesList.length && (
        <>
          <p className="products-page__total-amount">
            {`${phonesList.length} models`}
          </p>

          <div className="products-page__selectors selectors">
            <SortBySelect />

            <ItemsOnPageSelect />
          </div>
        </>
      )}

      {isLoading && <Loader />}

      {!isLoading && !!currentPhonesList.length ? (
        <>
          <ProductsList
            products={currentPhonesList}
            isSlider={false}
          />

          {(currentPhonesList.length < phonesList.length) && (
            <>
              <LoadMore
                productsList={phonesList}
                currentProductsList={currentPhonesList}
                setCurrentProductsList={setCurrentPhonesList}
                total={paginationTotal}
              />

              <PaginationPages
                total={paginationTotal}
              />
            </>
          )}
        </>
      ) : (
        !isLoading && (
          <NoSearchResults />
        )
      )}
    </div>
  );
};
