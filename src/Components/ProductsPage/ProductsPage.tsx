import { useEffect, useState } from 'react';
import { useMatch, useSearchParams } from 'react-router-dom';

import {
  getPoductsByCategory,
  getProductById,
  getProducts,
  querySort,
} from '../../Helpers/Helpers';

import { updateSeachParams } from '../../Helpers/updateSearchParams';
import { ErrorPage } from '../../Pages/ErrorPage/ErrorPage';
import { Product } from '../../Types/Product';
import { ProductDetails } from '../../Types/ProductDeteils';
import { Catalog } from '../Catalog/Catalog';
import { Loader } from '../Loader';
import { Location } from '../Location/Location';
import { Pagination } from '../Pagination/Pagination';
import { Placeholder } from '../Placeholder/Placeholder';
import { EmptyPage } from '../../Pages/EmptyPage/EmptyPage';
import { ProductDetailsPage } from '../ProductDetails/ProductDetails';

import './ProductsPage.scss';

type Props = {
  isLoader: boolean,
  setIsLoader: (value: boolean) => void,
  category: string,
  title: string,
};

export const ProductPage: React.FC<Props> = ({
  isLoader, setIsLoader, category, title,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<
  ProductDetails | null
  >(null);

  const [products, setPhonesProducts] = useState<Product[]>([]);
  const [isRender, setIsRender] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState('');

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || `${products.length}`;
  const sortBy = searchParams.get('sortBy') || 'year';
  const totalProducts = products.length;
  const query = searchParams.get('query') || '';

  const currentPageChange = (element : number) => {
    return updateSeachParams(searchParams, { page: element.toString() });
  };

  const match = useMatch('/phones/:productId');
  const productId = match?.params.productId || null;

  const suggestedProducts = [...products.sort()];

  const loadProductsData = async () => {
    try {
      setIsLoader(true);
      const productsData = await getProducts();
      const phonesData = getPoductsByCategory(productsData, category);

      const sortedData = querySort(phonesData, query);

      setPhonesProducts(sortedData);
    } catch (error) {
      setIsError(true);
      setIsErrorMessage(
        `Unfortunately, an error occurred,
        it is not possible to download data from the server.
        Try again later, we will resolve this issue soon.
        Thank you ;)`,
      );
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    loadProductsData();
  }, [query]);

  const loadDataProduct = async () => {
    try {
      setIsRender(true);
      if (productId !== null) {
        const productData: ProductDetails = await getProductById(productId);

        setSelectedProduct(productData);
      }
    } catch (error) {
      setIsError(true);
      setIsErrorMessage(
        `Unfortunately, an error occurred,
        it is not possible to download data from the server.
        Try again later, we will resolve this issue soon.
        Thank you ;)`,
      );
    } finally {
      setIsRender(false);
    }
  };

  useEffect(() => {
    loadDataProduct();
  }, [productId]);

  return (
    <section className="products">
      {isLoader || isRender ? (
        <Loader />
      ) : (
        <>
          {selectedProduct ? (
            <ProductDetailsPage
              product={selectedProduct}
              suggestedProducts={suggestedProducts}
            />
          ) : (
            <div className="products__wrapper">
              <div className="container">
                {isError ? (
                  <ErrorPage message={isErrorMessage} />
                ) : (
                  <>
                    <Location />
                    <Placeholder
                      title={title}
                      productsCount={products.length}
                    />

                    {!products.length ? (
                      <EmptyPage />
                    ) : (
                      <>
                        <Catalog
                          products={products}
                          perPage={perPage}
                          total={totalProducts}
                          sortBy={sortBy}
                          page={page}
                        />

                        <Pagination
                          total={totalProducts}
                          setPage={currentPageChange}
                          perPage={perPage}
                          page={page}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
