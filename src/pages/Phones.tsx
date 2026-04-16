import { useEffect, useState } from 'react';
import { ProductCarts } from '../components/ProductCart/ProductCarts';
import { PropsPhone } from '../types/PropsPhone';
import { getPhone } from '../fetch/fetchPhone';

type Props = {
  phones?: PropsPhone[] | null;
};

export const Phones: React.FC<Props> = ({ phones }) => {
  const [phonesState, setPhonesState] = useState<PropsPhone[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPhone()
      .then(data => setPhonesState(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line curly
  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error} <button onClick={() => window.location.reload()}>Retry</button></div>;

  return (
    <div className="container">
      <h1 className="title">Phones</h1>

      {phones?.map(p => (
        <ProductCarts
          key={p.id}
          id={p.id}
          title={p.title}
          price={p.price}
          screen={p.screen}
          capacity={p.capacity}
          ram={p.ram}
        />
      ))}
    </div>
  );
};
