import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { ProductCard } from '../ProductCard';

export const YouMayAlsoLike = () => {
  const { phones } = useContext(ProductContext);
  const suggestedPhones = getSuggestedProducts(phones);

  return (
    <>
      <div className="new-models">
        <h1 className="new-models__title">You may also like</h1>

        <div className="new-models__cards">
          {suggestedPhones.slice(0, 4).map(card => (
            <ProductCard key={card.id} product={card} />
          ))}
        </div>
      </div>
    </>
  );
};
