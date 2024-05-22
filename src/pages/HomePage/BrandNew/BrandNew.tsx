import { useContext, useEffect } from 'react';
import { CatalogContext } from '../../CatalogContext';
import Arrow_Left from '../../../images/homePage/Arrow_Left.svg';
import Arrow_Right from '../../../images/homePage/Arrow_Right.svg';
import Vector_light_left from '../../../images/homePage/Vector_light_left.svg';
import Vec_light_right from '../../../images/homePage/Vec_light_right.svg';
import './BrandNew.scss';
import { NavLink } from 'react-router-dom';
import { last, sliceToShow } from '../../../helpers/sliceToShow';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchAllProducts } from '../../../features/productssSlice';
import { PhoneTablAccessCard } from '../../../components/PhoneTablAccessCard/PhoneTablAccessCard';
import { TabAccessPhone } from '../../../types/tabAccessPhones';

export const BrandNew = () => {
  const {
    elOnPage,
    currentPage,
    handlePreviousPage,
    handleNextPage,
  } = useContext(CatalogContext);

  const brand = true;

  const dispatch = useAppDispatch();

  const { phones, tablets, accessories, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch]) 

  const allProducts: TabAccessPhone[] = phones.concat(tablets, accessories);

  const sortedBrand = allProducts.sort((a, b) =>
    b.priceRegular > a.priceRegular ? 1 : -1,
  );

  const getSortProducts = sliceToShow(sortedBrand, currentPage, elOnPage);

  const lastPage = last(sortedBrand, elOnPage);

  return !error ? (
    <div className="hotPrices">
      <div className="hotPrices__container">
        <div className="hotPrices__top">
          <h1 className="hotPrices__head">Brand new</h1>
          <div className="hotPrices__arrays">
            <button
              className="hotPrices__arrays__button
              hotPrices__arrays__left"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <img
                src={
                  currentPage === 1 ? `${Vector_light_left}` : `${Arrow_Left}`
                }
                className="hotPrices__arrays__img"
                alt={Arrow_Left}
              />
            </button>
            <button
              className="hotPrices__arrays__button"
              onClick={handleNextPage}
              disabled={currentPage === lastPage}
            >
              <img
                src={
                  currentPage === lastPage
                    ? `${Vec_light_right}`
                    : `${Arrow_Right}`
                }
                className="hotPrices__arrays__img"
                alt={Arrow_Right}
              />
            </button>
          </div>
        </div>
        <div className="hotPrices__cards">
          <div className="hotPrices__ribbon">
            {getSortProducts.map((item: TabAccessPhone) => (
              <NavLink
                key={item.id}
                to={`${item.category}/${item.id}`}
                className="productsPage__link"
              >
                <PhoneTablAccessCard 
                  product={item} 
                  key={item.id}
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
