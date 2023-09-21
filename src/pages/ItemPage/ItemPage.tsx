import React from 'react';
import { useParams } from 'react-router-dom';

import './ItemPage.scss';

export const ItemPage: React.FC = React.memo(() => {
  const params = useParams();

  return (
    <p>
      {params.seoUrl}
    </p>
  );
});
