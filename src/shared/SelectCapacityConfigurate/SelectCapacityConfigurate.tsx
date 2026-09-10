import React from 'react';
import { Phone } from '../../types/Phone';
import { Tablet } from '../../types/Tablet';
import { Accessory } from '../../types/Accessory';
import { useNavigate } from 'react-router-dom';

type Props = {
  selectedProduct: Phone | Tablet | Accessory | undefined;
  currentColor: string | undefined;
};

export const SelectCapacityConfigurate: React.FC<Props> = ({
  selectedProduct,
  currentColor,
}) => {
  const capacityAvailable = selectedProduct?.capacityAvailable;
  const navigate = useNavigate();

  return (
    <>
      <p className="text-small secondary">Select capacity</p>
      <div className="memory-buttons">
        {capacityAvailable?.map(memory => (
          <div
            className={
              memory === selectedProduct?.capacity
                ? 'memory-button--active'
                : 'memory-button'
            }
            key={memory}
            onClick={() => {
              navigate(
                `/${selectedProduct?.category}/${selectedProduct?.namespaceId}-${memory.toLowerCase()}-${currentColor}`,
              );
            }}
          >
            <p className="text-body">{memory}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectCapacityConfigurate;
