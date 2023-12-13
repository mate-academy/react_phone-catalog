import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { CatalogProduct } from '../../types/CatalogProduct';
import { getProducts } from '../../utils/fetchData';
import { getCurrentProductList } from '../../helpers/pagesMethods';
import { PagePath } from '../../components/PagePath/PagePath';
import { SortBySelect } from '../../components/SortBySelect/SortBySelect';
import {
  ItemsOnPageSelect,
} from '../../components/ItemsOnPageSelect/ItemsOnPageSelect';
import { NoResults } from '../../components/NoResult/NoResult';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { LoadMore } from '../../components/LoadMore/LoadMore';
import { PaginationPage } from '../../components/PaginationPage/PaginationPage';

export const AccessoriesPage: FC = () => {
  const [accessoriesList, setAccessoriesList] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '1';
  const previousPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';

  const navigate = useNavigate();

  const [currentTabletsList, setCurrentTabletsList]
    = useState<CatalogProduct[]>([]);

  const handeLoading = async () => {
    try {
      setIsLoading(true);

      const productsFromServer = await getProducts();

      const tablets = productsFromServer
        .filter((product: CatalogProduct) => product
          .category === 'accessories');

      const currentList = getCurrentProductList(
        tablets,
        sort,
        query,
        previousPage,
        page,
        setPaginationTotal,
      );

      setAccessoriesList(tablets);
      setCurrentTabletsList(currentList);
      setIsInitialized(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate('/notfound', { replace: true });
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      handeLoading();
    }

    if (isInitialized) {
      setIsLoading(true);

      const currentList = getCurrentProductList(
        accessoriesList,
        sort,
        query,
        previousPage,
        page,
        setPaginationTotal,
      );

      setCurrentTabletsList(currentList);

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [location]);

  return (
    <div className="
      main__products-page
      main__products-page--width
      products-page"
    >
      <PagePath url="/accessories" title="Accessories" />

      <h1 className="products-page__title page-title">Accessories</h1>

      {isInitialized && !!accessoriesList.length ? (
        <>
          <p className="products-page__total-amount">
            {`${accessoriesList.length} models`}
          </p>

          <div className="products-page__selectors selectors">
            <SortBySelect />

            <ItemsOnPageSelect />
          </div>
        </>
      ) : (
        !isLoading && (
          <NoResults
            imageUrl="img/noData.jpg"
            title="Sorry, the selected product is not available"
          />
        )
      )}

      {isLoading && <Loader />}

      {!isLoading && !!accessoriesList.length && (
        <>
          <ProductsList
            products={currentTabletsList}
            isSlider={false}
          />

          {(currentTabletsList.length < accessoriesList.length) && (
            <>
              <LoadMore
                productsList={accessoriesList}
                currentProductsList={currentTabletsList}
                setCurrentProductsList={setCurrentTabletsList}
                total={paginationTotal}
              />

              <PaginationPage
                total={paginationTotal}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
