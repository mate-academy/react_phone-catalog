import { useContext, useEffect, useMemo } from 'react';
import './YouMayAlsoLike.scss';
import { CatalogContext } from '../../pages/CatalogContext';
import { Link, useLocation } from 'react-router-dom';
import { last, sliceToShow } from '../../helpers/sliceToShow';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PhoneTablAccessCard } from '../PhoneTablAccessCard/PhoneTablAccessCard';
import { Arrays } from '../Arrays';
import { Product } from '../../types/product';
import { fetchAllProducts } from '../../features/allProductsSlice';

export const YouMayAlsoLike = () => {
  const { elOnPage, currentPage } =
    useContext(CatalogContext);

  const { pathname } = useLocation();

  const paths = pathname.split('/').filter(path => path);

  const dispatch = useAppDispatch();

  const { products } = useAppSelector(
    state => state.allProducts,
  );

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts());
    }

  }, [products]);

  const { sortedPoducts } = useMemo(() => {
    const shuffle = products.sort(() => Math.round(Math.random() * 100) - 50);
    const getSortProducts = sliceToShow(shuffle, currentPage, elOnPage);

    return {
      sortedPoducts: getSortProducts,
      lastPage: last(shuffle, elOnPage)
    };
  }, [products, currentPage, elOnPage]);

  return (
    <div className="hotPrices">
      <div className="hotPrices__container">
        <div className="hotPrices__top">
          <h1 className={`hotPrices__head theme-${theme}`}>You may also like</h1>
          <Arrays />
        </div>
        <div className="hotPrices__cards">
          <div className="hotPrices__ribbon">
            {sortedPoducts.map((item: Product) => (
              <Link
                key={item.id}
                to={{ pathname: `/${paths[0]}/${item.id}` }}
                className="productsPage__link"
              >
                <PhoneTablAccessCard product={item} key={item.id} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
