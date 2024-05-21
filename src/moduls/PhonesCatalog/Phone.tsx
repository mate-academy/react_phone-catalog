import React, { useContext } from 'react';
import { Catalog } from '../../componentsApp/Catalog/Catalog';
import { StateContext } from '../../context/ContextReducer';
import './Phone.scss';

export const PhoneCatalog: React.FC = () => {
  const { phones } = useContext(StateContext);

  return (
    <div className="Phone-catalog">
      <div className="Phone-catalog__items">
        <Catalog
          devices={phones}
          titleCatalog="Mobile phones"
          nonCatalog={false}
        />
      </div>
    </div>
  );
};
