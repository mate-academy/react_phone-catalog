import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Catalog } from '../components/Catalog';
import { Navigation } from '../components/Navigation';
import { Product } from '../types/Product';

export const FavoritePage: React.FC = () => {
  const catalog: Product[] = localStorage.getItem('fav')
    ? JSON.parse(localStorage.getItem('fav') || '')
    : [];
  const [sortedCatalog, setSortedCatalog] = useState<Product[]>([...catalog]);
  const amount = sortedCatalog.length;
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
  }, [catalog]);

  useEffect(() => {
    setSortedCatalog(
      catalog.filter(
        item => item.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [query]);

  return (
    <main>
      <Navigation />
      <section className="page">
        <div className="page__catalog">
          <h1>Favorites</h1>
          {sortedCatalog && (
            <div>
              <p className="text__body page__subtitle">
                {`${amount} ${amount > 1 ? 'models' : 'model'}`}
              </p>
              <Catalog
                catalog={sortedCatalog}
                start={0}
                end={amount}
              />
            </div>
          )}
        </div>

        <div />
      </section>
    </main>
  );
};
