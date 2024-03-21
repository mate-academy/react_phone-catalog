import React from 'react';
import { BreadCrumbs } from '../components/BreadCrumbs';
import { Categories } from '../types/Categories';

import '../App.scss';

export const TabletsPage: React.FC = () => {
  return (
    <>
      <BreadCrumbs category={Categories.Tablets} />

      <h1 className="warning">
        There is no products on this page for now.We are working on it.
      </h1>
    </>
  );
};
