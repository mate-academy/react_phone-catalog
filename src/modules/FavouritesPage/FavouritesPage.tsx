import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header';
import { Productlist } from '../../components/ProductList';
import { useAppSelector } from '../../utils/store';
import './FavouritesPage.module.scss';

export const FavouritesPage = () => {
  const favourites = useAppSelector(state => state.favourites);

  return (
    <div className="favouritespage" id="favourites">
      <Header />
      <div className="container mb-container">
        <Breadcrumbs paragraph={'Favourites'} />
        <h1 className="favouritespage__title title">Favourites</h1>
        <p className="favouritespage__counter category__counter">
          {favourites.length} items
        </p>

        {favourites.length > 0 ? (
          <Productlist products={favourites} />
        ) : (
          <h1 className="emptylist__title fav-empty">
            There are no favourites yet
          </h1>
        )}
      </div>

      <Footer />
    </div>
  );
};
