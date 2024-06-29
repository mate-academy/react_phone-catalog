import React, { useContext } from 'react';
import { getNewModels } from '../../utils/getNewModels';
import { ProductCard } from '../ProductCard';
import './NewModels.scss';
import { ProductContext } from '../../store/ProductContext';

export const NewModels: React.FC = ({}) => {
  const { phones } = useContext(ProductContext);

  const newModels = getNewModels(phones, 8);

  return (
    <>
      <div className="new-models">
        <h1 className="new-models__title">Brand new models</h1>
        <div className="new-models__container">
          {newModels.slice(0, 4).map(card => (
            <ProductCard key={card.id} product={card} />
          ))}
        </div>
      </div>
    </>
  );
};
