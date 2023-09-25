import { Link } from 'react-router-dom';
import './FavoritesPage.scss';
import { ProductList } from '../../Components/ProductList/ProductList';
import { useFav } from '../../Helpers/FavContex';
import { filterFunction, noResult } from '../../Helpers/functions';
import { useSearch } from '../../Helpers/SearchContext';
import {
  NoSearchResults,
} from '../../Components/NoSearchResults/NoSearchResults';
import { Loader } from '../../Components/Loader/Loader';

export const FavoritesPage: React.FC = () => {
  const { products, quantity, isLoading } = useFav();
  const { searchQuery } = useSearch();
  const filteredProducts = filterFunction(products, searchQuery);
  const isNoResult = noResult(products, searchQuery);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (searchQuery !== '' && !isNoResult) {
    content = <NoSearchResults />;
  } else {
    content = (
      <>
        <p className="favourites__quantity">
          {quantity}
          {' '}
          items
        </p>
        <ProductList products={filteredProducts} />
      </>
    );
  }

  return (
    <div className="favourites">
      <div className="favourites__top">
        <Link to="/">
          <img
            src="images/Home.svg"
            alt="HomeIcon"
            className="favourites__icon"
          />
        </Link>

        <img
          src="images/DisabledArrow.svg"
          alt="Arrow"
          className="favourites__icon"
        />

        <p className="favourites__string">Favourites</p>
      </div>

      <h1 className="favorites__title">Favourites</h1>

      {content}
    </div>
  );
};
