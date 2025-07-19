import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { ProductCard } from '../../components/ProductCard';

export const AccessoriesPage = () => {
  const { products, isLoading, error } = useContext(DataContext);
  const accessories = products.filter(
    product => product.category === 'accessories',
  );

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

  if (!accessories || accessories.length === 0) {
    return <p>There are no accessories yet</p>;
  }

  return (
    <div>
      <h1>Accessories page</h1>
      <ul className="grid grid-cols-4 gap-4">
        {accessories.map(accessory => (
          <ProductCard key={accessory.id} product={accessory} />
        ))}
      </ul>
    </div>
  );
};
