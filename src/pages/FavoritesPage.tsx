import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store'; // adjust if your root store path is different
import { ProductCard } from '../components/ProductCard/ProductCard';
import { getFavoritesQuantity } from '../features/favorites';
import { IoIosArrowForward } from 'react-icons/io';
import { LuHouse } from "react-icons/lu";
import { Link } from 'react-router-dom';
export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch();

  // Destructure values from the cart slice
  const { favoriteItems, favoriteTotalQuantity } = useSelector(
    (state: RootState) => state.favorites,
  );

  // Recalculate totals whenever cartItems change
  useEffect(() => {
    dispatch(getFavoritesQuantity());
  }, [favoriteItems, dispatch]);

  return (
    <div className="section" id="favorites">
      <div className="favorites">
        <div className="top__back__link">
          <Link to="/home" className="icon__house">
            <LuHouse color="#313237" />
          </Link>
          <Link to="/home" className="top__back__link">
            <IoIosArrowForward />
            <p>Favorites</p>
          </Link>
        </div>
        <h1 id="heading1">Favorites </h1>
        <p>{favoriteTotalQuantity} items</p>
        {favoriteItems.length === 0 ? (
          <p>Your list is currently empty.</p>
        ) : (
          <div className="cards__container">
            {favoriteItems.map(product => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
