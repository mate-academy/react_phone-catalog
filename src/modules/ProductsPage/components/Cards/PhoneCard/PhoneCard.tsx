import React from 'react';
import ProductCard from '../Productcard/Productcard';
import { Phone } from '../../../../../types/ProductTypes/Phone';

type PhonesCardProps = { phone: Phone };

const PhoneCard: React.FC<PhonesCardProps> = ({ phone }) => {
  return (
    <ProductCard
      product={{
        id: phone.id,
        itemId: phone.itemId,       
        name: phone.name,
        priceDiscount: phone.priceDiscount,
        priceRegular: phone.priceRegular,
        image: phone.images?.[0],   
      }}
    />
  );
};

export default PhoneCard;
