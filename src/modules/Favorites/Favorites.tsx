import React from 'react';
import PageHeader from '../shared/components/PageHeader/PageHeader';

const Favorites: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Favourites"
        showBreadCrumbs
        variant="favPage"
      />
    </>
  );
};

export default Favorites;
