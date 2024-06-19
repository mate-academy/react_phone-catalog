import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import './FavouritesPage.scss';
import Home from '../../images/Home.svg';
import Vec_light_right from '../../images/homePage/Vec_light_right.svg';
import { ProductList } from '../ProductList/ProductList';

export const FavouritesPage = () => {
  const { favProducts } = useAppSelector(state => state.favourites);

  return favProducts.length !== 0 ? (
    <div className="productsPage">
      <div className="productsPage__constrain">
        <div className="productsPage__breadcrumbs">
          <NavLink to="/" className="productsPage__home-link">
            <img src={Home} alt="home" className="productsPage__home" />
          </NavLink>
          <img
            src={Vec_light_right}
            alt="Vector_light_right"
            className="productsPage__arrow-right"
          />
          <div className="productsPage__phones">Favourites</div>
        </div>
        <h1 className="productsPage__header">Favourites</h1>
        <div className="productsPage__models">{`${favProducts.length} items`}</div>

        <div className="productsPage__container">
          <ProductList products={favProducts} />
        </div>
      </div>
    </div>
  ) : (
    <div>There are no selected products</div>
  );
};
