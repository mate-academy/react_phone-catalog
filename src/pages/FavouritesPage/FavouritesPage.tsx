import { useContext } from 'react';
import { ProductItem } from '../../components/product/ProductItem';
import './FavouritesPage.scss';
import { StateContext } from '../../AppContext';
import { NoResults } from '../NoResults/NoResults';

export const FafouritesPage: React.FC = () => {
  const { state } = useContext(StateContext);

  if (state.favourites.length === 0) {
    return <NoResults headline="Nothing was found" />;
  }

  return (
    <div className="list-container">
      {state.favourites.map(item => {
        return (
          <ProductItem product={item} />
        );
      })}
    </div>
  );
};
