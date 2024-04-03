import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductItem } from '../../components/product/ProductItem';
import './FavouritesPage.scss';
import { StateContext } from '../../AppContext';
import { NoResults } from '../NoResults/NoResults';

export const FafouritesPage: React.FC = () => {
  const { state } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  let copy = [...state.favourites];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (state.favourites.length === 0) {
    return <NoResults headline="Nothing was found" />;
  }

  if (search.length > 0) {
    copy = [...copy.filter(
      phone => phone.name.toLocaleLowerCase().includes(
        search.toLocaleLowerCase(),
      ),
    )];
  }

  return (
    <div className="list-container">
      {copy.map(item => {
        return (
          <ProductItem product={item} key={item.id} />
        );
      })}
    </div>
  );
};
