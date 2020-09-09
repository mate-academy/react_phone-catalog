import React, { FC } from 'react';

import Breadcrumbs from './Breadcrumbs';
import Title from './Title';

const AccessoriesPage: FC = () => {
  return (
    <div className="accessories">
      <Breadcrumbs title="Accessories" subtitle="" />
      <Title title="Accessories" />
      <h3 className="accessories__oops">
        There is no accessories yet. Please, come later
        <span role="img" aria-label="Grinny">😅</span>
      </h3>
    </div>
  );
};

export default AccessoriesPage;
