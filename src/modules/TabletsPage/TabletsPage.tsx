import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { ProductCard } from '../../components/ProductCard';

export const TabletsPage = () => {
  const { products, isLoading, error } = useContext(DataContext);
  const tablets = products.filter(product => product.category === 'tablets');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong</p>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  if (!tablets || tablets.length === 0) {
    return <p>There are no tablets yet</p>;
  }

  return (
    <div>
      <h1>Tablets</h1>
      <ul className="grid grid-cols-4 gap-4">
        {tablets.map(tablet => (
          <ProductCard key={tablet.id} product={tablet} />
        ))}
      </ul>
    </div>
  );
};
