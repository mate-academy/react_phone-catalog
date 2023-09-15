import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ItemsOnPageSelect } from '../../components/ItemsOnPageSelect';
import { Loader } from '../../components/Loader';
import { LoadMore } from '../../components/LoadMore';
import { PagePath } from '../../components/PagePath';
import { PaginationPages } from '../../components/PaginationPages';
import { ProductsList } from '../../components/ProductsList';
import { SortBySelect } from '../../components/SortBySelect';
import { getProductsList } from '../../helpers/fetchData';
import { getCurrentProductList } from '../../helpers/pagesMethods';
import { CatalogProduct } from '../../types/CatalogProduct';
import '../ProductsPage.scss';

export const TabletsPage: FC = () => {
  const [tabletsList, setTabletsList] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';

  const [currentTabletsList, setCurrentTabletsList]
    = useState<CatalogProduct[]>([]);

  const navigate = useNavigate();

  const handleLoading = async () => {
    try {
      setIsLoading(true);

      const productsFromServer = await getProductsList();

      const tablets = productsFromServer
        .filter((product: CatalogProduct) => product.category === 'tablet');

      const currentList = getCurrentProductList(
        tablets,
        sort,
        query,
        perPage,
        page,
        setPaginationTotal,
      );

      setTabletsList(tablets);
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
      handleLoading();
    }

    if (isInitialized) {
      setIsLoading(true);

      const currentList = getCurrentProductList(
        tabletsList,
        sort,
        query,
        perPage,
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
    <div
      className="
        main__products-page
        main__products-page--width
        products-page
      "
    >
      <PagePath url="/tablets" title="Tablets" />

      <h1 className="products-page__title page-title">Tablets</h1>

      {isInitialized && !!tabletsList.length ? (
        <>
          <p className="products-page__total-amount">
            {`${tabletsList.length} models`}
          </p>

          <div className="products-page__selectors selectors">
            <SortBySelect />

            <ItemsOnPageSelect />
          </div>
        </>
      ) : (
        !isLoading && (
          <h3>Sorry, there are no products found.</h3>
        )
      )}

      {isLoading && <Loader />}

      {!isLoading && !!tabletsList.length && (
        <>
          <ProductsList
            products={currentTabletsList}
            isSlider={false}
          />

          {(currentTabletsList.length < tabletsList.length) && (
            <>
              <LoadMore
                productsList={tabletsList}
                currentProductsList={currentTabletsList}
                setCurrentProductsList={setCurrentTabletsList}
                total={paginationTotal}
              />

              <PaginationPages
                total={paginationTotal}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
