import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { getFavourites } from '../../helpers/utils';
import { PhoneItem } from '../../components/product/ProductItem';
import './FavouritesPage.scss';
import { StateContext } from '../../AppContext';

export const FafouritesPage: React.FC = () => {
  // const favourites = getFavourites();
  const { state } = useContext(StateContext);

  return (
    <div className="test">
      {state.favourites.map(item => {
        const key = uuidv4();

        return (
          <PhoneItem product={item} key={key} />
        );
      })}
    </div>
  );
};
