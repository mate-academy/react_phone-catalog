import React from 'react';
import ProductCard from '../Productcard/Productcard';
import { Accessory } from '../../../../../types/ProductTypes/Accessory';

type AccessoriesCardProps = { accessory: Accessory };

const AccessoriesCard: React.FC<AccessoriesCardProps> = ({ accessory }) => {
  return (
    <ProductCard
      product={{
        id: accessory.id,
        name: accessory.name,
        priceDiscount: accessory.priceDiscount,
        priceRegular: accessory.priceRegular,
        image: accessory.images[0],
      }}
    />
  );
};

export default AccessoriesCard;