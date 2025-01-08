import { useContext, useEffect } from 'react';
import { CatalogContext } from '../../CatalogContext';
import './HotPrices.scss';
import { NavLink } from 'react-router-dom';
import { sliceToShow } from '../../../helpers/sliceToShow';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { PhoneTablAccessCard } from '../../../components/PhoneTablAccessCard/PhoneTablAccessCard';
import { Arrays } from '../../../components/Arrays';
import { Product } from '../../../types/product';
import { fetchAllProducts } from '../../../features/allProductsSlice';

export const HotPrices = () => {
  const { elOnPage, currentPage } = useContext(CatalogContext);

  const dispatch = useAppDispatch();

  const { products, error } = useAppSelector(state => state.allProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const sortedByPrice = products.length
    ? [...products].sort((a, b) => b.price - a.price)
    : products;

  const visibleItems = sliceToShow(sortedByPrice, currentPage, elOnPage);

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const categoryHeader = `hotPrices__head theme-${theme}`;

  return !error ? (
    <div className="hotPrices">
      <div className="hotPrices__container">
        <div className="hotPrices__top">
          <h1 className={categoryHeader}>Hot prices</h1>
          <Arrays />
        </div>
        <div className="hotPrices__cards">
          <div className="hotPrices__ribbon">
            {visibleItems.map((item: Product) => (
              <NavLink
                key={item.id}
                to={`${item.category}/${item.id}`}
                className="productsPage__link"
              >
                <PhoneTablAccessCard product={item} key={item.id} />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
