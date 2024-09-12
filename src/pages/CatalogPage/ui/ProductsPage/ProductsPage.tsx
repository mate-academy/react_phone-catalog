import { useCallback } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { ProductsPageFilter } from '../ProductsPageFilter/ProductsPageFilter';
import { getPreparedProductsList } from '../../model/selectors/getPreparedProductsList';
import { getProductsIsLoading } from '../../model/selectors/getProductsIsLoading';
import { prepareProductsList } from '../../model/services/prepareProductsList';
import { getProductsCount } from '../../model/selectors/getProductsCount';
import { productPageSliceActions } from '../../model/slice/productPageSlice';
import { getPagesCount } from '../../model/selectors/getPagesCount';
import { getCurrentPage } from '../../model/selectors/getCurrentPage';
import { ProductsList } from '../../../../entities/Product';
import { Section } from '../../../../shared/ui/Section';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/hooks/reduxHooks';
import {
  CategoriesEnum,
  CategoriesEnumValues,
} from '../../../../entities/Categories';
import { PagePartTop } from '../../../../features/PagePartTop';
import { getSearchWith } from '../../../../shared/lib/utils/getSearchWith';
import { TitlePagesEnum } from '../../../../widgets/Header/model/types/header';
import { RoutePaths } from '../../../../shared/config/routeConfig';
import { getProductsError } from '../../model/selectors/getProductsError';
import cls from './productPage.module.scss';
import { PageError } from '../../../../widgets/PageError';
import { TextBlock } from '../../../../shared/ui/TextBlock';

const ProductsPage = () => {
  const { category } = useParams<{ category: string }>();
  const dispatch = useAppDispatch();
  const totalPages = useAppSelector(getPagesCount);
  const { setCurrentPage } = productPageSliceActions;
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useAppSelector(getPreparedProductsList);
  const productsCount = useAppSelector(getProductsCount);
  const isLoading = useAppSelector(getProductsIsLoading);
  const currentPage = useAppSelector(getCurrentPage);
  const error = useAppSelector(getProductsError);

  const title = TitlePagesEnum[category as CategoriesEnum];

  const onChangeCurrentPage = useCallback(
    (page: number) => {
      if (currentPage !== page) {
        dispatch(setCurrentPage(page));
        setSearchParams(
          getSearchWith(searchParams, {
            page: page !== 1 ? page.toString() : null,
          }),
        );

        dispatch(prepareProductsList(category as CategoriesEnum));
      }
    },
    [
      category,
      currentPage,
      dispatch,
      searchParams,
      setCurrentPage,
      setSearchParams,
    ],
  );

  const isValidCategory = Object.values(CategoriesEnumValues).includes(
    category as CategoriesEnum,
  );

  if (!isValidCategory) {
    return <Navigate to={RoutePaths.not_found} replace />;
  }

  return (
    <>
      <Section firstSection lastSection>
        <PagePartTop
          isLoading={isLoading}
          productsCount={productsCount}
          title={title}
        />
        {!error && isValidCategory ? (
          <>
            <ProductsPageFilter className={cls.productPage__filter} />
            {products.length > 0 ? (
              <ProductsList
                products={products}
                isLoading={isLoading}
                totalPages={totalPages}
                onChangeCurrentPage={onChangeCurrentPage}
                currentPage={currentPage}
              />
            ) : (
              <TextBlock text={`There are no ${category} yet`} />
            )}
          </>
        ) : (
          <PageError />
        )}
      </Section>
    </>
  );
};

export default ProductsPage;
