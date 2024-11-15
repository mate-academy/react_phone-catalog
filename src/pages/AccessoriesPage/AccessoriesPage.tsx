/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsPageContent } from '../../components/ProductsPageContent';
import { GeneralContext } from '../../helpers/GeneralContext';
import { Product } from '../../types/Product';
import { getAccessories } from '../../api/api';

export const Accessories: React.FC = () => {
  const { setIsLoading } = useContext(GeneralContext);
  const [accessoriesList, setAccessoriesList] = useState<Product[]>([]);
  const [filteredList, setFilteredList] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allProducts = await getAccessories();

        setAccessoriesList(allProducts);
        setFilteredList(allProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (query) {
      const searchResults = accessoriesList.filter(accessory => {
        return accessory.name.toLowerCase().includes(query.toLowerCase());
      });

      setFilteredList(searchResults);
    } else {
      setFilteredList(accessoriesList);
    }

    setIsLoading(false);
  }, [query]);

  return (
    <section className="accessories">
      <ProductsPageContent
        type="Accessories"
        title="Accessories"
        itemsList={filteredList}
      />
    </section>
  );
};
