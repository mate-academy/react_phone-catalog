import './PhonesPage.scss';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../customHooks/customHooks';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { filterProducts } from '../../utils/filterProducts';
import { Categories } from '../../types/Categories';
import { sortProducts } from '../../utils/sortProducts';
import { productsToShown } from '../../utils/productsToShown';
import { getProducts } from '../../utils/getProducts';
import { setProducts } from '../../expansions/products';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { DropdownBlock } from '../../components/DropdownBlock';
import { PorductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import { Skeleton } from '../../components/Skeleton';

export const PhonesPage: React.FC = () => {
  const [isloading, setIsLoading] = useState(false);

  const { products } = useAppSelector(state => state.products);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const currentPage = searchParams.get('page') || 1;
  const perPage = searchParams.get('perPage');

  const filteredProducts = filterProducts(products, Categories.Phones);
  const sortedProducts = sortProducts(filteredProducts, sort);

  const visibleProducts = productsToShown(
    filteredProducts,
    perPage,
    currentPage,
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(resolve => {
        const resolvedProducts = resolve.map(product => ({
          ...product,
          quantity: 1,
        }));

        dispatch(setProducts(resolvedProducts));
      })
      .catch(() => 'Unable to load data from server!')
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, [dispatch, searchParams]);

  // if (!itemsOnPage.length && !isloading) {
  //   return (
  //     <NotFoundProductPage title={t('tabletsPage.notFoundProduct.tablets')} />
  //   );
  // }

  return (
    <div className="phonesPage" id="phones">
      <BreadCrumbs />
      <div className="phonesPage__title">
        <h1 className="phonesPage__title_text">Mobile phones</h1>
        <p className="phonesPage__title_count">
          {filteredProducts.length} models
        </p>
      </div>

      <div className="phonesPage__dropdown_section">
        <DropdownBlock />
      </div>

      {isloading ? (
        <Skeleton products={visibleProducts} />
      ) : (
        <>
          <PorductsList products={visibleProducts} />
        </>
      )}

      {perPage && <Pagination itemsCount={sortedProducts.length} />}
    </div>
  );
};
