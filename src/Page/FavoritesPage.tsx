import { TypeAnimation } from 'react-type-animation';
import { useAppSelector } from '../app/hooks';
import { Breadcrumbs } from '../components/Bredcrambs/Breadcrumbs';
import { Favourites } from '../components/Favourites';
import {
  selectFavouritesPhones,
} from '../features/favouritesSlices/favouritesSlice';
import '../components/Favourites/Favourites.scss';

export const FavouritesPage = () => {
  const favouritesPhones = useAppSelector(selectFavouritesPhones);

  return (
    <>
      <Breadcrumbs />
      <h1 className='favourites__title'>Favourites</h1>
      <p className='favourites__itemLength'>{`${favouritesPhones.length} items`}</p>

      {!favouritesPhones.length ? (
        <TypeAnimation
          sequence={["You don't have favourites products", 1000]}
          style={{
            fontSize: '3em',
            display: 'flex',
            fontWeight: '700',
            padding: '32px 0',
            color: '#313237',
          }}
        />
      ) : (
        <Favourites favouritesPhones={favouritesPhones} />
      )}
    </>
  );
};
