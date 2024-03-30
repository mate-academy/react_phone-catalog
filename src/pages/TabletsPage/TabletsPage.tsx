/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ProductsPageContent } from '../../components/ProductsPageContent';
import { Product } from '../../types/Product';
import { GeneralContext } from '../../helpers/GeneralContext';
import { getTablets } from '../../api/api';

export const TabletsPage: React.FC = () => {
  const { setIsLoading } = useContext(GeneralContext);
  const [tabletsList, setTabletsList] = useState<Product[]>([]);
  const [filteredList, setFilteredList] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allProducts = await getTablets();

        setTabletsList(allProducts);
        setFilteredList(allProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (query) {
      const searchResults = tabletsList.filter(tablet => {
        return tablet.name.toLowerCase().includes(query.toLowerCase());
      });

      setFilteredList(searchResults);
    } else {
      setFilteredList(tabletsList);
    }

    setIsLoading(false);
  }, [query]);

  return (
    <section className="tabletsPage">
      <ProductsPageContent
        type="Tablets"
        title="Tablets"
        itemsList={filteredList}
      />
    </section>
  );
};
