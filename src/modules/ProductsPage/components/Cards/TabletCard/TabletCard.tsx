import React from 'react';
import ProductCard from '../Productcard/Productcard';
import { Tablet } from '../../../../../types/ProductTypes/Tablet';

type TabletsCardProps = { tablet: Tablet };

const TabletCard: React.FC<TabletsCardProps> = ({ tablet }) => {
  return (
    <ProductCard
      product={{
        id: tablet.id,
        name: tablet.name,
        priceDiscount: tablet.priceDiscount,
        priceRegular: tablet.priceRegular,
        image: tablet.images[0],
      }}
    />
  );
};

export default TabletCard;
