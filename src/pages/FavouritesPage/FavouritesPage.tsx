import { useContext } from 'react';
import { ProductItem } from '../../components/product/ProductItem';
import './FavouritesPage.scss';
import { StateContext } from '../../AppContext';

export const FafouritesPage: React.FC = () => {
  const { state } = useContext(StateContext);

  return (
    <div className="test">
      {state.favourites.map(item => {
        return (
          <ProductItem product={item} />
        );
      })}
    </div>
  );
};
