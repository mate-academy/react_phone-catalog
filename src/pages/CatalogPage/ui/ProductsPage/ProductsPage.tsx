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
import cls from './productPage.module.scss';
import { RoutePaths } from '../../../../shared/config/routeConfig';

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

  let title = '';

  const isValidCategory = Object.values(CategoriesEnumValues).includes(
    category as CategoriesEnum,
  );

  if (!isValidCategory) {
    return <Navigate to={RoutePaths.not_found} replace />;
  }

  if (category) {
    title = TitlePagesEnum[category as CategoriesEnum];
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const onChangeCurrentPage = useCallback(
    (page: number) => {
      if (currentPage !== page) {
        dispatch(setCurrentPage(page));
        setSearchParams(
          getSearchWith(searchParams, {
            page: page !== 1 ? page.toString() : null,
          }),
        );

        if (category !== undefined && category !== '') {
          dispatch(prepareProductsList(category as CategoriesEnum));
        }
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

  return (
    <>
      <Section firstSection lastSection>
        <PagePartTop
          isLoading={isLoading}
          productsCount={productsCount}
          title={title}
        />
        <ProductsPageFilter className={cls.productPage__filter} />
        <ProductsList
          products={products}
          isLoading={isLoading}
          totalPages={totalPages}
          onChangeCurrentPage={onChangeCurrentPage}
          currentPage={currentPage}
        />
      </Section>
    </>
  );
};

export default ProductsPage;
