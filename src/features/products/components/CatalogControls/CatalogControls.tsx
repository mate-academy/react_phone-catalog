import { useTranslation } from 'react-i18next';
import { Dropdown } from '@/components/ui/Dropdown';
import styles from './CatalogControls.module.scss';

type CatalogControlsProps = {
  sortBy: string;
  perPage: number | string;
  onUpdate: (key: string, value: string) => void;
};

export const CatalogControls = ({
  sortBy,
  perPage,
  onUpdate,
}: CatalogControlsProps) => {
  const { t } = useTranslation();

  const PER_PAGE_OPTIONS = [
    { label: '8', value: 8 },
    { label: '16', value: 16 },
    { label: '32', value: 32 },
    { label: t('catalog.controls.all'), value: 'all' },
  ];

  const sortOptions = [
    { label: t('catalog.sort.newest'), value: 'newest' },
    { label: t('catalog.sort.priceDesc'), value: 'priceDesc' },
    { label: t('catalog.sort.priceAsc'), value: 'priceAsc' },
    { label: 'A-Z', value: 'nameAsc' },
    { label: 'Z-A', value: 'nameDesc' },
  ];

  return (
    <div className={styles.controls}>
      <Dropdown
        label={t('catalog.controls.sortBy')}
        value={sortBy}
        options={sortOptions}
        onChange={val => onUpdate('sort', String(val))}
        width="220px"
      />
      <Dropdown
        label={t('catalog.controls.itemsOnPage')}
        value={perPage}
        options={PER_PAGE_OPTIONS}
        onChange={val => onUpdate('perPage', String(val))}
        width="128px"
      />
    </div>
  );
};
