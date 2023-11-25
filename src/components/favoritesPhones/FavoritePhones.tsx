import { useHeaderContext } from '../../provider/HeaderContext';
import { MobileHome } from '../MobileHome/MobileHome';
import { PhonesCard } from '../phones/PhonesCard';
import './styles.scss';

export const FavoritePhones = () => {
  const { favoritePhones } = useHeaderContext();

  return (
    <div className="favorite">
      <MobileHome />
      <h1 className="favorite__title">Favourites</h1>
      <p className="favorite__items">{`${favoritePhones.length} ${favoritePhones.length === 1 ? 'item' : 'items'}`}</p>

      <div className="favorite__phones">
        <PhonesCard phones={favoritePhones} showOldPrice />
      </div>
    </div>
  );
};

export default FavoritePhones;
