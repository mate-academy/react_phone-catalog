import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsList } from '../../components/ProductsList';
import { ProductsContext } from '../../context/ProductsContext';
import './FavouritesPage.scss';
import { Item } from '../../types/Item';
import { getFilteredProducts } from '../../helpers/getFilteredProducts';
import { Loader } from '../../components/Loader';
import { Title } from '../../components/Title';
import { HistoryLinks } from '../../components/HistoryLinks';

export const FavouritesPage = () => {
  const { favourites, isLoading } = useContext(ProductsContext);
  const [products, setProducts] = useState<Item[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query') || '';

    setProducts(getFilteredProducts(favourites, query));
  }, [favourites, searchParams.get('query')]);

  return (
    <div className="FavouritesPage">
      <HistoryLinks links={[{ title: 'Favourites', link: '/favourites' }]} />
      <div className="FavouritesPage__title">
        <Title title="Favourites" />
        <p className="FavouritesPage__title-count">
          {`${favourites.length} models`}
        </p>
      </div>
      {
        isLoading
          ? <Loader />
          : <ProductsList products={products} />
      }
    </div>
  );
};
