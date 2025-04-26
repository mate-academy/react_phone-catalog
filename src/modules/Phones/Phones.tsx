'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PhonesHeader } from './components/PhonesHeader';
import { PhonesGrid } from './components/PhonesGrid';

export const Phones = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ✅ Стан керується повністю локально
  const [sortBy, setSortBy] = useState('Newest');
  const [itemsOnPage, setItemsOnPage] = useState('8');
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Один раз парсимо з URL при mount
  useEffect(() => {
    const sort = searchParams.get('sort') || 'Newest';
    const perPage = searchParams.get('perPage') || '8';
    const page = parseInt(searchParams.get('page') || '1');

    setSortBy(sort);
    setItemsOnPage(perPage);
    setCurrentPage(page);
  }, []); // 🟡 тільки при першому рендері

  // ✅ Коли щось змінюється — оновлюємо URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (sortBy !== 'Newest') params.set('sort', sortBy);
    if (itemsOnPage !== 'All') params.set('perPage', itemsOnPage);
    if (currentPage !== 1) params.set('page', String(currentPage));
    navigate({ search: params.toString() }, { replace: true });
  }, [sortBy, itemsOnPage, currentPage]);

  // 🔁 Функції зміни з reset page
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handlePerPageChange = (value: string) => {
    setItemsOnPage(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Breadcrumbs />
      <PhonesHeader
        sortBy={sortBy}
        setSortBy={handleSortChange}
        itemsOnPage={itemsOnPage}
        setItemsOnPage={handlePerPageChange}
      />
      <PhonesGrid
        sortBy={sortBy}
        itemsOnPage={itemsOnPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
