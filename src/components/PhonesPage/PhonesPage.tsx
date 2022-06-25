import React from 'react';
import Catalog from '../Catalog/Catalog';

const PhonesPage:React.FC = () => (
  <div className="phonesPage">
    <Catalog
      type="phone"
      title="Mobile phones"
      link="phones"
    />
  </div>
);

export default PhonesPage;
