import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { ProductCard } from '../../components/ProductCard';

export const PhonesPage = () => {
  const { products, isLoading, error } = useContext(DataContext);
  const phones = products.filter(product => product.category === 'phones');

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

  if (!phones || phones.length === 0) {
    return <p>There are no phones yet</p>;
  }

  return (
    <div>
      <h1>Phones page</h1>
      <ul className="grid grid-cols-4 gap-4">
        {phones.map(phone => (
          <ProductCard key={phone.id} product={phone} />
        ))}
      </ul>
    </div>
  );
};
