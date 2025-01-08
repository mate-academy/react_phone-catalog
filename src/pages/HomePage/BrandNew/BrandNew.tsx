import { useContext, useEffect } from 'react';
import { CatalogContext } from '../../CatalogContext';
import './BrandNew.scss';
import { NavLink } from 'react-router-dom';
import { sliceToShow } from '../../../helpers/sliceToShow';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { PhoneTablAccessCard } from '../../../components/PhoneTablAccessCard/PhoneTablAccessCard';
import { Arrays } from '../../../components/Arrays';
import { Product } from '../../../types/product';
import { fetchAllProducts } from '../../../features/allProductsSlice';

export const BrandNew = () => {
  const { elOnPage, currentPage } = useContext(CatalogContext);

  const brand = true;

  const dispatch = useAppDispatch();

  const { products, error } = useAppSelector(state => state.allProducts);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts());
    }
  }, [products.length]);

  const sortedBrand = products.length
    ? [...products].sort((a, b) => b.fullPrice - a.fullPrice)
    : products;

  const getSortProducts = sliceToShow(sortedBrand, currentPage, elOnPage);

  const theme = useAppSelector(state => state.themeSwitcher.theme);

  const headClass = `hotPrices__head theme-${theme}`;

  return !error ? (
    <div className="hotPrices">
      <div className="hotPrices__container">
        <div className="hotPrices__top">
          <h1 className={headClass}>Brand new models</h1>
          <Arrays />
        </div>
        <div className="hotPrices__cards">
          <div className="hotPrices__ribbon">
            {getSortProducts.map((item: Product) => (
              <NavLink
                key={item.itemId}
                to={`${item.category}/${item.itemId}`}
                className="productsPage__link"
              >
                <PhoneTablAccessCard
                  product={item}
                  key={item.itemId}
                  brand={brand}
                />
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
