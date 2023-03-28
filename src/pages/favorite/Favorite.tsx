import { useContext } from 'react';
import './favorite.scss';
import { Card } from '../../components/card/Card';
import { Way } from '../../components/way/Way';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';

export const Favorit = () => {
  const [state] = useContext(GlobalContext);

  return (
    <div className="favorite">
      <Way />
      <h2 className="favorite-title">Favourites</h2>
      {state.favoriteProducts.length ? (
        <>
          <div className="count-product">
            {`${state.favoriteProducts.length} ${
              state.favoriteProducts.length > 1 ? 'items' : 'item'
            }`}
          </div>
          <div className="list-favorite-wrapper">
            {state.favoriteProducts.map((el: Product) => (
              <Card product={el} key={el.age} />
            ))}
          </div>
        </>
      ) : (
        <div>List is empty, please choose device </div>
      )}
    </div>
  );
};
