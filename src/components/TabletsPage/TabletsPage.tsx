import React from 'react';
import Catalog from '../Catalog/Catalog';

const TabletsPage:React.FC = () => {
  return (
    <div className="tabletsPage">
      <Catalog
        type="tablet"
        title="Tablets"
        link="tablets"
      />
    </div>
  );
};

export default TabletsPage;
