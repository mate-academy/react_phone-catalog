import { useSearchParams } from 'react-router-dom';
import styles from './AccessoriesPage.module.scss';
import { Card } from '../shared/Card';
import { Pagination } from '../shared/Pagination';
import { useAccessories } from '../../hooks/useProducts';
import { PerPageOption, SortOption, SortSection } from '../shared/Sort';
import { TitleSection } from '../shared/TitleSection';
import { useTranslation } from 'react-i18next';

export const AccessoriesPage = () => {
  // #region variables
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = (searchParams.get('sort') || 'age') as SortOption;
  const perPageParam = (searchParams.get('perPage') || '4') as PerPageOption;
  const accessories = useAccessories();

  const currentPage = Number(searchParams.get('page')) || 1;

  const perPage =
    perPageParam === 'all' ? accessories.length : Number(perPageParam);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(currentPage * perPage, accessories.length);

  const totalPages = Math.ceil(accessories.length / perPage);

  const sortedAccessories = accessories.toSorted((a, b) => {
    switch (sort) {
      case 'title':
        return a.name.localeCompare(b.name);

      case 'price':
        return a.priceDiscount - b.priceDiscount;

      case 'age':
      default:
        return b.priceRegular - a.priceRegular;
    }
  });

  // #endregion

  const { t } = useTranslation();

  // #region function
  const getPaginationModel = (thisPage: number, allPages: number) => {
    const model: (number | string)[] = [];

    model.push(1);

    const leftRange = Math.max(2, thisPage - 1);
    const rightRange = Math.min(allPages - 1, thisPage + 1);

    if (leftRange > 2) {
      model.push('...');
    }

    for (let i = leftRange; i <= rightRange; i++) {
      model.push(i);
    }

    if (rightRange < allPages - 1) {
      model.push('...');
    }

    if (allPages > 1) {
      model.push(allPages);
    }

    return model;
  };

  const pages = getPaginationModel(currentPage, totalPages);

  function handlePerPageChange(value: PerPageOption) {
    const params = new URLSearchParams(searchParams);

    params.set('perPage', value);
    params.set('page', '1');
    setSearchParams(params);
  }

  function handleSortChange(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    params.set('page', '1');
    setSearchParams(params);
  }
  // #endregion

  return (
    <div className={styles.accessoriesPage}>
      <TitleSection
        historyText={t('Accessories')}
        title={t('Accessories')}
        quantity={accessories.length}
      />
      <SortSection
        sort={sort}
        handleSortChange={handleSortChange}
        perPage={perPageParam}
        handlePerPageChange={handlePerPageChange}
      />
      <div className={styles.productsList}>
        {sortedAccessories.slice(startIndex, endIndex).map(acs => (
          <Card
            key={acs.id}
            id={acs.id}
            image={acs.images[0]}
            name={acs.name}
            price={acs.priceDiscount}
            fullPrice={acs.priceRegular}
            screen={acs.screen}
            capacity={acs.capacity}
            ram={acs.ram}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};
