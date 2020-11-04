import React, { FC } from 'react';

import Breadcrumbs from './Breadcrumbs';
import Title from './Title';

const TabletsPage: FC = () => {
  return (
    <div className="tablets">
      <Breadcrumbs title="Tablets" subtitle="" />
      <Title title="Tablets" />
      <h3 className="tablets__oops">
        There is no tablets yet. Please, come later
        <span role="img" aria-label="Grinny">😅</span>
      </h3>
    </div>
  );
};

export default TabletsPage;
