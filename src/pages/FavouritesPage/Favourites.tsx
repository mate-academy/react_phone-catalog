import { MainNavigation } from '../../components/MainNavigation/MainNavigation';
import { PhoneCard } from '../../components/PhoneCard/PhoneCard';
import { Phone } from '../../types/Phone';
import { CartItem } from '../../types/CartItem';
import { NoResults } from '../NoResultsPage/NoResults';
import './Favourites.scss';

type Props = {
  likedProducts: Phone[],
  setLikedProducts: React.Dispatch<React.SetStateAction<Phone[]>>,
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const Favourites: React.FC<Props> = ({
  likedProducts,
  setLikedProducts,
  cartProducts,
  setCartProducts,
}) => {
  return (
    <>
      <div className="favourites">
        <MainNavigation />

        <div className="favourites__content">
          <h1 className="favourites__title">
            Favorites
          </h1>

          <p className="favourites__subtitle">
            {`${likedProducts.length} items`}
          </p>

          {!likedProducts.length ? (
            <NoResults />
          ) : (
            <div className="favourites__phones">
              {likedProducts.map(product => (
                <div className="favourites__phones--item">
                  <PhoneCard
                    phone={product}
                    likedProducts={likedProducts}
                    setLikedProducts={setLikedProducts}
                    cartProducts={cartProducts}
                    setCartProducts={setCartProducts}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
