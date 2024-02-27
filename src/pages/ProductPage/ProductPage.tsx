/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getItems } from '../../helpers/api';
import { Loader } from '../../components/Loader';
import { Dropdown } from '../../components/Dropdown';
import { ProductList } from '../../components/ProductList';
import { Pagination } from '../../components/Pagination';
import { NoResults } from '../../components/NoResults';
import { Breadcrumbs } from '../../components/Breadcrubs';
import { NoSearchResults } from '../../components/NoSearchResults';
import { NewParamsProps } from '../../types/NewParams';

type ProductPageProps = {
  addParam: (newParams: NewParamsProps) => void;
  title: string,
  productType: string,
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

const SORT_DROPDOWN_INFO = [
  { title: 'Newest', paramValue: 'age' },
  { title: 'Alphabetically', paramValue: 'name' },
  { title: 'Cheapest', paramValue: 'price' },
];

const PAGINATION_DROPDOWN_INFO = [
  { title: '4', paramValue: '4' },
  { title: '8', paramValue: '8' },
  { title: '16', paramValue: '16' },
  { title: 'All', paramValue: 'all' },
];

export const ProductPage: React.FC<ProductPageProps> = ({
  addParam,
  title,
  productType,
  setFavLength,
  setCartLength,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [searchParams] = useSearchParams();

  const sortAndFilterProducts = (productList: Product[]) => {
    let newProductList = [...productList];
    const sort = searchParams.get('sort') || SORT_DROPDOWN_INFO[0].paramValue;
    const query = searchParams.get('query') || '';

    if (sort) {
      newProductList.sort((product1, product2) => {
        const value1 = sort === 'age' ? product1.year : product1[sort];
        const value2 = sort === 'age' ? product2.year : product2[sort];

        if (typeof value1 === 'string' && typeof value2 === 'string') {
          return value1.toLowerCase()
            .localeCompare(value2.toLowerCase());
        }

        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return sort === 'age' ? value2 - value1 : value1 - value2;
        }

        return 0;
      });
    }

    if (query) {
      newProductList = newProductList.filter((product: Product) => {
        return product.itemId.replaceAll('-', '')
          .includes(query.replace(/[^a-zA-Z0-9]/g, '').toLocaleLowerCase());
      });
    }

    setNewProducts(newProductList);
  };

  useEffect(() => {
    getItems(productType).then(res => {
      sortAndFilterProducts(res);
      setProducts(res);
    })
      .finally(() => setIsLoadingPage(false));
  }, []);

  useEffect(() => {
    sortAndFilterProducts(products);
  }, [searchParams]);

  return (
    <>
      {isLoadingPage
        ? (<Loader />)
        : (
          <>
            <Breadcrumbs />

            <div className="product-page__title">
              {title}
            </div>

            <div className="product-page__models-number">
              {`${products.length} models`}
            </div>

            {products.length > 0
              ? (
                <>
                  {newProducts.length > 0
                    ? (
                      <>
                        <div className="product-page__dropdowns">
                          <Dropdown
                            addParam={addParam}
                            param="sort"
                            info={SORT_DROPDOWN_INFO}
                          />
                          <Dropdown
                            addParam={addParam}
                            param="perPage"
                            info={PAGINATION_DROPDOWN_INFO}
                          />
                        </div>

                        <ProductList
                          products={newProducts}
                          setFavLength={setFavLength}
                          setCartLength={setCartLength}
                        />
                        {newProducts.length > 4 && (
                          <Pagination
                            addParam={addParam}
                            productsQuantity={newProducts.length}
                          />
                        )}
                      </>
                    )
                    : (
                      <NoSearchResults />
                    )}
                </>
              )
              : (
                <NoResults categoryName={productType} />
              )}
          </>
        )}
    </>
  );
};
