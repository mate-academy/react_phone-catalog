import { Product } from '../types/Product';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';
import { Header } from './Header';
import { ProductCard } from './ProductCard';
import '../styles/favoritePage.scss';

export const FavoritesPage: React.FC = () => {
  const value: string | null = localStorage.getItem('favourite');
  const favStorage: Product[] | [] = value
    ? JSON.parse(value)
    : [];

  return (
    <>
      <Header />
      <main>
        <div className="favorites container">
          <Breadcrumbs />
          <h2 className="favorites__title">Favourites</h2>
          {favStorage.length > 0 ? (
            <>
              <p className="favorites__count">{`${favStorage.length} items`}</p>
              <div className="favorites__content">
                {favStorage.map(product => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </>
          ) : (
            <p>Products not found</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
