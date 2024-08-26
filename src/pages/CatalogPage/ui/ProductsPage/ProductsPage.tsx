import { useParams, useSearchParams } from 'react-router-dom';
import { ProductsPageFilter } from '../ProductsPageFilter/ProductsPageFilter';
import { ProductsList } from '../../../../entities/Product';
import { TitlePagesEnum } from '../../../../widgets/Header/model/types/header';
import { Section } from '../../../../shared/ui/Section';
import { TitleTag } from '../../../../shared/ui/TitleTag/TitleTag';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../shared/lib/hooks/reduxHooks';
import { getPreparedProductsList } from '../../model/selectors/getPreparedProductsList';
import { getProductsIsLoading } from '../../model/selectors/getProductsIsLoading';
import cls from './productPage.module.scss';
import { PaginationProducts } from '../../../../widgets/PaginationProducts';
import { getProductsCount } from '../../model/selectors/getProductsCount';
import { useCallback } from 'react';
import { productPageSliceActions } from '../../model/slice/productPageSlice';
import { getSearchWith } from '../../../../shared/lib/utils/getSearchWith';
import { prepareProductsList } from '../../model/services/prepareProductsList';
import { CategoriesEnum } from '../../../../entities/Categories';
import { getPagesCount } from '../../model/selectors/getPagesCount';
import { getCurrentPage } from '../../model/selectors/getCurrentPage';
import { Sceleton } from '../../../../shared/ui/Sceleton/Sceleton';

const ProductsPage = () => {
  const { category } = useParams();
  const dispatch = useAppDispatch();
  const pagesCount = useAppSelector(getPagesCount);
  const { setCurrentPage } = productPageSliceActions;
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useAppSelector(getPreparedProductsList);
  const productsCount = useAppSelector(getProductsCount);
  const isLoading = useAppSelector(getProductsIsLoading);
  const currentPage = useAppSelector(getCurrentPage);

  let pageTitle = '';

  if (category) {
    pageTitle = TitlePagesEnum[category];
  }

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
      <Section firstSection className={`${cls.productPageTop}`}>
        <TitleTag
          Tag="h1"
          title={pageTitle}
          className={cls.productPage__title}
        />

        {!isLoading ? (
          <p className={cls.productPage__label}>{`${productsCount} models`}</p>
        ) : (
          <Sceleton height={21} width={'100%'} />
        )}
      </Section>
      <ProductsPageFilter className={cls.productPage__filter} />
      <ProductsList products={products} isLoading={isLoading} />
      <PaginationProducts
        lastSection
        onChangePage={onChangeCurrentPage}
        pagesCount={pagesCount}
      />
    </>
  );
};

export default ProductsPage;
