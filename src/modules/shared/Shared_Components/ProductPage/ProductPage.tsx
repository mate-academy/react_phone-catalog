import { ProductPageSort } from './ProductPageSort';
import { ProductPageButtons } from './ProductPageButtons';
import { ProductCard } from '../ProductCard/ProductCard';
import { PaginationValues } from './types/types';
import { useLocation, useSearchParams } from 'react-router-dom';
import { UpdatedProduct } from '../../Types/types';
import { useEffect, useMemo } from 'react';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
// eslint-disable-next-line max-len
import { ProductCardSkeleton } from '../ProductCardSkeleton/ProductCardSkeleton';
import { NoResultCat } from '../NoResultCat/NoResultCat';
import { scrollToTop } from '../../../../utils/scrollToTop';

interface Props {
  pageTitle: string;
  listOfProducts: UpdatedProduct[] | [];
  isLoading: boolean;
}

export const ProductPage: React.FC<Props> = ({
  pageTitle,
  listOfProducts,
  isLoading,
}) => {
  const { pathname } = useLocation();
  const pageName = pathname.replace('/', '');

  const [searchParams] = useSearchParams();
  const objectOfParams = {
    activePage: +(searchParams.get('page') || 1),
    perPage: searchParams.get('perPage') || PaginationValues.All,
    sort: searchParams.get('sort') || '',
    query: searchParams.get('query') || '',
  };

  const visibleProducts = useMemo(() => {
    const newList = [...listOfProducts].filter(item => {
      const normalizedInput = objectOfParams.query
        .replaceAll(' ', '')
        .toLowerCase();
      const normalizedName = item.name.replaceAll(' ', '').toLowerCase();

      return normalizedName.includes(normalizedInput);
    });

    switch (objectOfParams.sort) {
      case 'price':
        return newList.sort((prev, next) => {
          return prev.price - next.price;
        });
      case 'age':
        return newList.sort((prev, next) => {
          return next.year - prev.year;
        });
      case 'title':
        return newList.sort((prev, next) => {
          return prev.name.localeCompare(next.name);
        });
      default:
        return newList;
    }
  }, [listOfProducts, objectOfParams.sort, objectOfParams.query]);

  const quantityOfPages =
    objectOfParams.perPage !== PaginationValues.All
      ? visibleProducts.length / +objectOfParams.perPage
      : 0;

  const arrayOfPages = Array.from(
    { length: Math.ceil(quantityOfPages) },
    (_, i) => i + 1,
  );

  const itemsPerPage =
    objectOfParams.perPage === PaginationValues.All
      ? visibleProducts.length
      : +objectOfParams.perPage;
  const startingItemToShow =
    objectOfParams.activePage * itemsPerPage - itemsPerPage;
  const lastItemToShow = objectOfParams.activePage * itemsPerPage - 1;

  const cardToRender = (item: UpdatedProduct, i: number) => {
    let card = <ProductCard key={item.id} item={item} />;

    if (
      item.name.includes('iPhone 7') ||
      item.name.includes('iPad 10.2') ||
      item.name.includes('Series 3')
    ) {
      card = <ProductCard key={item.id} item={item} discount={true} />;
    }

    return i >= startingItemToShow && i <= lastItemToShow ? card : null;
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <section className="product-page container">
      <Breadcrumb pathname={pathname} pageName={pageName} />

      <div className="product-page__top">
        <div className="product-page__navigation"></div>

        <div className="product-page__title">
          <h1 className="title title--h1 product-page__h1">{pageTitle}</h1>

          <p className="product-page__text">{`${listOfProducts.length} models`}</p>
        </div>

        <ProductPageSort pageTitle={pageTitle} isLoading={isLoading} />
      </div>

      {visibleProducts.length && !isLoading ? (
        <div className="product-page__list">
          {visibleProducts.map((item, i) => cardToRender(item, i))}
        </div>
      ) : isLoading ? (
        <div className="product-page__list">
          <ProductCardSkeleton />

          <ProductCardSkeleton />

          <ProductCardSkeleton />

          <ProductCardSkeleton />
        </div>
      ) : (
        !visibleProducts.length && !isLoading && <NoResultCat />
      )}

      {objectOfParams.perPage !== 'All' && (
        <ProductPageButtons
          numberOfPages={arrayOfPages}
          activePage={objectOfParams.activePage}
        />
      )}
    </section>
  );
};
