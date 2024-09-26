import React from 'react';
import { Card } from '../Card/Card';
// import { ProductTypeExtended } from '../../api/type/ProductTypeExtended';
import { ProductType } from '../../api/type/ProductType';

type Props = {
  newPhones: ProductType[];
};

export const CardsList: React.FC<Props> = ({ newPhones }) => {

    return (
    <div style={{display: "flex", gap: "15px", width: "100%"}} >
      {newPhones.map((phone) => {
        return <Card key={phone.id} product={phone} />;
      })}
    </div>
  );
};
