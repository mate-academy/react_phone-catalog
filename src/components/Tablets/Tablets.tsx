import { useEffect, useState } from 'react';
import { Product } from '../../Type/products';
import { getTablets } from '../../utils/fetch';
import { ProductTabletCard } from '../ProductTabletCard/ProductTabletCard';

export const Tablets = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTablets()
      .then(setTablets)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const tablets2 = [...tablets]
    .filter(phone => phone.type === 'tablet');

  return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <h2>Mobile phones</h2>

      {tablets2.map(tablet => (
        <div
          key={tablet.id}
        >
          <ProductTabletCard tablet={tablet} />
        </div>
      ))}

      {!isLoading && isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
    </section>
  );
};

export default Tablets;
