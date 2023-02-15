import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FavContext } from '../../FavContext';
import { Product } from '../../types/Product';
import { NoFavouriteProducts }
  from '../NoFavouriteProducts/NoFavouriteProducts';
import { ProductsList } from '../ProductsList/ProductsList';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';
import './Favourites.scss';

type Props = {
  products: Product[];
};

export const Favourites: React.FC<Props> = ({ products }) => {
  const { favourites } = useContext(FavContext);
  const [seachParams] = useSearchParams();
  const query = seachParams.get('query' || '');
  const favouritesProducts
    = products.filter(item => favourites.includes(item.id));

  const searchPhones = () => {
    if (query) {
      return favouritesProducts.filter(item => item.name.toLowerCase()
        .includes(query.toLowerCase()));
    }

    return favouritesProducts;
  };

  const searchedProducts = useMemo(searchPhones, [favourites, products, query]);

  return (
    <div className="favourites">
      <h1 className="favourites__title">Favourites</h1>

      <p className="favourites__amount">{`${favourites.length} items`}</p>

      {favourites.length === 0 && (
        <NoFavouriteProducts />
      )}

      {favourites.length !== 0
        && (
          searchedProducts.length === 0
            ? (
              <NoSearchResults />
            )
            : (
              <ProductsList
                sortedProducts={searchedProducts}
                page={null}
                itemsPerPage={null}
              />
            )
        )}
    </div>
  );
};
