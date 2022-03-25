import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NoResult } from '../components/NoResult';
import { SortedSlider } from '../components/SortedSlider';
import { Phone } from '../components/ProductCard';

type Props = {
  gadgetsList: Phone[],
  handleCart: (id: string) => void,
  handleFavorite: (id: string) => void,
  favorite: string[],
  cart: string[],
};

export const Favorites: React.FC<Props> = ({
  gadgetsList,
  handleCart,
  handleFavorite,
  favorite,
  cart,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {
        favorite.length > 0 ? (
          <>
            <div className="product-page__link-container">
              <Link to="/" className="product-page__link" />
              <div className="product-page__arrow" />
              <div className="product-page__title">Favourites</div>
            </div>
            <h2 className="section__title product-page__section-title">Favourites</h2>
            <div className="section__counter">{`${favorite.length} items`}</div>
            <SortedSlider
              favorite={favorite}
              cart={cart}
              list={gadgetsList.filter((gadget: Phone) => favorite.includes(gadget.id))}
              handleCart={handleCart}
              handleFavorite={handleFavorite}
            />
          </>
        ) : (
          <NoResult />
        )
      }
    </>
  );
};
