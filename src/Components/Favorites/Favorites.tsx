import { useContext } from 'react';
import { Context } from '../../Store/Store';
import { CradList } from '../Cards/CardList/CardList';

export const Favorites = () => {
  const { favorite } = useContext(Context);

  return (
    <div className="favorite-container">
      <div style={{ color: 'red' }}>{`Home > Favorite`}</div>
      <h1>Favorites</h1>
      <div>items №</div>
      <div className="favorites-cards">
        <div className="favortites-card">
          {favorite.length !== 0 && <CradList products={favorite} />}
        </div>
      </div>
    </div>
  );
};
