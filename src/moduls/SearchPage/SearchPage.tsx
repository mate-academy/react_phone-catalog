import { useSearchParams } from 'react-router-dom';

import { useContext } from 'react';
import { StateContext } from '../../Provider/GadgetsContext';


import styles from './SearchPage.module.scss';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useContext(StateContext);

  const query = searchParams.get('query');

  return (
    <main>
      <div className="page-container"></div>
    </main>
  );
};
