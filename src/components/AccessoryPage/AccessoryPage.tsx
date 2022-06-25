import React from 'react';
import Catalog from '../Catalog/Catalog';

const AccessoryPage:React.FC = () => (
  <div className="tabletsPage">
    <Catalog
      type="accessory"
      title="Accessory"
      link="accessory"
    />
  </div>
);

export default AccessoryPage;
