import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Header } from '../../components/header/Header';
import { Product } from '../../helpers/types/Product';
import {
  getAccessories, getPhones, getTablets,
} from '../../helpers/api/GetProducts';
import { DropdownOption } from '../../helpers/types/DropdownOption';
import { DropdownId } from '../../helpers/enums/DropdownId';
import {
  PAGE_KEY, PER_PAGE_KEY, QUERY_KEY, SORT_KEY,
} from '../../helpers/constants/SearchParamsKeys';
import { ProductType } from '../../helpers/enums/ProductType';
import { Breadcrumbs } from '../../components/main/Breadcrumbs';
import { NoSearchResults } from '../../components/main/NoSearchResults';
import { ProductsCount } from '../../components/main/ProductsCount';
import { ProductsList } from '../../components/main/ProductsList';
import { Title } from '../../components/main/Title';
import { Dropdown } from '../../components/main/products/Dropdown';
import { Loader } from '../../components/main/products/Loader';
import { NoResults } from '../../components/main/products/NoResults';
import {
  Pagination,
} from '../../components/main/products/pagination/Pagination';

type ProductsPageProps = {
  categoryType: ProductType
};

export const ProductsPage = ({ categoryType }: ProductsPageProps) => {
  const [
    displayedProducts,
    setDisplayedProducts,
  ] = useState<Product[] | null>(null);
  const [afterFilterProductsCount, setAfterFilterProductsCount] = useState(0);
  const [serverProductsCount, setServerProductsCount] = useState(-1);
  const [isRendered, setIsRendered] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const queryLowerCase = searchParams.get(QUERY_KEY)?.toLowerCase();
  const sort = searchParams.get(SORT_KEY);
  const perPageString = searchParams.get(PER_PAGE_KEY);
  const currentPage = +(searchParams.get(PAGE_KEY) || 1);
  const productsCount = displayedProducts?.length || 0;
  let searchPlaceholderText;
  let breadcrumbsEndName;
  let productsDownloader: Promise<Product[]>;
  let titleText;

  switch (categoryType) {
    case ProductType.tablet:
      searchPlaceholderText = 'tablets';
      breadcrumbsEndName = 'Tablets';
      productsDownloader = getTablets();
      titleText = 'Tablets';
      break;
    case ProductType.accessories:
      searchPlaceholderText = 'accesories';
      breadcrumbsEndName = 'Accessories';
      productsDownloader = getAccessories();
      titleText = 'Accessories';
      break;
    default:
    case ProductType.phone:
      searchPlaceholderText = 'phones';
      breadcrumbsEndName = 'Phones';
      productsDownloader = getPhones();
      titleText = 'Mobile phones';
      break;
  }

  let perPage: number;

  const possibleSorts = ['age', 'name', 'price'];
  const possiblePages = ['all', '4', '8', '16'];
  const areMinResults = afterFilterProductsCount >= +possiblePages[1];
  const dropdownProductsOptions: DropdownOption[] = [
    { text: 'Newest', value: possibleSorts[0] },
    { text: 'Alphabetically', value: possibleSorts[1] },
    { text: 'Cheapest', value: possibleSorts[2] },
  ];
  const productsCounterClasses = classNames('products__count', {
    'products__count--query': queryLowerCase,
  });
  const dropdownPagesOptions: DropdownOption[] = possiblePages.map(
    possiblePage => {
      return {
        text: possiblePage,
        value: possiblePage,
      };
    },
  );

  if (perPageString === possiblePages[0]) {
    perPage = productsCount;
  } else {
    perPage = +(perPageString || productsCount);
  }

  const breadcrumbsPath = [{
    text: breadcrumbsEndName,
  }];
  let itemsCountText;

  if (queryLowerCase) {
    itemsCountText = `${afterFilterProductsCount} result${afterFilterProductsCount === 1 ? '' : 's'}`;
  } else {
    itemsCountText = `${afterFilterProductsCount} model${afterFilterProductsCount === 1 ? '' : 's'}`;
  }

  const showPagination
    = perPageString !== possiblePages[0]
    && afterFilterProductsCount >= perPage
    && areMinResults;

  const handlePageChange = (page: number) => {
    searchParams.set(PAGE_KEY, page.toString());
    setSearchParams(searchParams);
  };

  const isCurrentPageValid
    = searchParams.get(PAGE_KEY) === null
    || (
      Number.isInteger(currentPage)
      && currentPage > 0
      && currentPage <= Math.ceil(afterFilterProductsCount / perPage)
    );

  const noMatchedSearchResult
    = (!afterFilterProductsCount && queryLowerCase)
    || (sort && !possibleSorts.includes(sort))
    || (perPageString && !possiblePages.includes(perPageString))
    || (!isCurrentPageValid);

  useEffect(() => {
    if (!isRendered) {
      if (searchParams.get(PER_PAGE_KEY) === null) {
        searchParams.set(PER_PAGE_KEY, possiblePages[0]);
      }

      if (searchParams.get(SORT_KEY) === null) {
        searchParams.set(SORT_KEY, possibleSorts[0]);
      }

      setSearchParams(searchParams, { replace: true });
      setIsRendered(true);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('sort') !== null
    && searchParams.get('perPage') !== null) {
      productsDownloader
        .then(receivedProducts => {
          setServerProductsCount(receivedProducts.length);

          let products = [...receivedProducts];

          if (queryLowerCase) {
            products = receivedProducts.filter(
              product => product.name.toLowerCase().includes(queryLowerCase),
            );
          }

          setAfterFilterProductsCount(products.length);
          products.sort((product1, product2) => {
            switch (sort) {
              case 'price':
                return product1.price - product2.price;
              default:
              case 'name':
                return product1.name.localeCompare(product2.name);
              case 'age':
                return product1.age - product2.age;
            }
          });

          if (!perPageString || perPageString === possiblePages[0]) {
            setDisplayedProducts(products);
          } else {
            const startIndex = (currentPage - 1) * perPage;
            const lastIndex = currentPage * perPage - 1;

            setDisplayedProducts(products.filter(
              (_, index) => index >= startIndex && index <= lastIndex,
            ));
          }
        });
    }
  }, [queryLowerCase, sort, currentPage, perPageString]);

  return (
    <>
      <Header
        hasSearch
        currentPage={searchPlaceholderText}
      />

      {displayedProducts === null ? <Loader /> : (
        <main className="products">
          {!queryLowerCase && <Breadcrumbs path={breadcrumbsPath} />}

          {noMatchedSearchResult || !serverProductsCount ? (
            <div className="products__no-results">
              {serverProductsCount ? (
                <NoSearchResults />
              ) : (
                <NoResults categoryName={titleText} />
              )}
            </div>
          ) : (
            <>
              {!queryLowerCase && (
                <Title extraClassName="products__title">{titleText}</Title>
              )}

              <ProductsCount
                countText={itemsCountText}
                extraClasses={productsCounterClasses}
              />

              {areMinResults && (
                <div className="products__filters">
                  <Dropdown
                    id={DropdownId.features}
                    description="Sort by"
                    options={dropdownProductsOptions}
                  />

                  <Dropdown
                    id={DropdownId.pages}
                    description="Items on page"
                    options={dropdownPagesOptions}
                  />
                </div>
              )}

              {productsCount && <ProductsList products={displayedProducts} />}

              {showPagination && (
                <Pagination
                  onPageChange={handlePageChange}
                  perPage={perPage}
                  currentPage={currentPage}
                  total={afterFilterProductsCount}
                />
              )}
            </>
          )}
        </main>
      )}
    </>
  );
};
