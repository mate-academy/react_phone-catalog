import { useSearchParams } from 'react-router-dom';
import styles from './TabletsPage.module.scss';
import { Card } from '../shared/Card';
import { Pagination } from '../shared/Pagination';
import { useTablets } from '../../hooks/useProducts';
import { PerPageOption, SortOption, SortSection } from '../shared/Sort';
import { TitleSection } from '../shared/TitleSection';
import { useTranslation } from 'react-i18next';

export const TabletsPage = () => {
  // #region variables
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = (searchParams.get('sort') || 'age') as SortOption;
  const perPageParam = (searchParams.get('perPage') || '4') as PerPageOption;
  const tablets = useTablets();

  const currentPage = Number(searchParams.get('page')) || 1;

  const perPage =
    perPageParam === 'all' ? tablets.length : Number(perPageParam);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(currentPage * perPage, tablets.length);

  const totalPages = Math.ceil(tablets.length / perPage);

  const sortedTablets = tablets.toSorted((a, b) => {
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
    <div className={styles.tabletsPage}>
      <TitleSection
        historyText={t('Tablets')}
        title={t('Tablets')}
        quantity={tablets.length}
      />
      <SortSection
        sort={sort}
        handleSortChange={handleSortChange}
        perPage={perPageParam}
        handlePerPageChange={handlePerPageChange}
      />
      <div className={styles.productsList}>
        {sortedTablets.slice(startIndex, endIndex).map(tablet => (
          <Card
            key={tablet.id}
            id={tablet.id}
            image={tablet.images[0]}
            name={tablet.name}
            price={tablet.priceDiscount}
            fullPrice={tablet.priceRegular}
            screen={tablet.screen}
            capacity={tablet.capacity}
            ram={tablet.ram}
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
