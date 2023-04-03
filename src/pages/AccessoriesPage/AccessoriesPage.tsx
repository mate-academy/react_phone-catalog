import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ItemsOnPageSelect } from '../../components/ItemsOnPageSelect';
import { Loader } from '../../components/Loader';
import { LoadMore } from '../../components/LoadMore';
import { NoResults } from '../../components/NoResults';
import { PagePath } from '../../components/PagePath';
import { PaginationPages } from '../../components/PaginationPages';
import { ProductsList } from '../../components/ProductsList';
import { SortBySelect } from '../../components/SortBySelect';
import { getProductsList } from '../../helpers/fetchData';
import { getCurrentProductList } from '../../helpers/pagesMethods';
import { CatalogProduct } from '../../types/CatalogProduct';

export const AccessoriesPage: FC = () => {
  const [accessoriesList, setAccessoriesList] = useState<CatalogProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [paginationTotal, setPaginationTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort') || '';
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';

  const [currentAccessoriesList, setCurrentAccessoriesList]
    = useState<CatalogProduct[]>([]);

  const navigate = useNavigate();

  const handleLoading = async () => {
    try {
      setIsLoading(true);

      const productsFromServer = await getProductsList();

      const accessories = productsFromServer
        .filter(
          (product: CatalogProduct) => product.category === 'accessories',
        );

      const currentList = getCurrentProductList(
        accessories,
        sort,
        query,
        perPage,
        page,
        setPaginationTotal,
      );

      setAccessoriesList(accessories);
      setCurrentAccessoriesList(currentList);
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
        accessoriesList,
        sort,
        query,
        perPage,
        page,
        setPaginationTotal,
      );

      setCurrentAccessoriesList(currentList);

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
            title="Sorry, there are no products found &#128533;"
            imageUrl="/new/img/No_results.jpg"
          />
        )
      )}

      {isLoading && <Loader />}

      {!isLoading && !!accessoriesList.length && (
        <>
          <ProductsList
            products={currentAccessoriesList}
            isSlider={false}
          />

          {(currentAccessoriesList.length < accessoriesList.length) && (
            <>
              <LoadMore
                productsList={accessoriesList}
                currentProductsList={currentAccessoriesList}
                setCurrentProductsList={setCurrentAccessoriesList}
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
