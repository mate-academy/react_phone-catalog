import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Navbar } from '../../components/Navbar/Navbar';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import './FavoritesPage.scss';
import { SearchBar } from '../../components/SearchBar/SearchBar';

export const FavoritesPage = () => {
  return (
    <>
      <Navbar>
        <SearchBar />
      </Navbar>

      <main className="favorites">
        <Breadcrumbs />

        <h1 className="favorites__title">Favorites</h1>

        <p className="favorites__count">5 items</p>

        <ProductsList>
          <li>yo</li>
        </ProductsList>
      </main>
    </>
  );
};
