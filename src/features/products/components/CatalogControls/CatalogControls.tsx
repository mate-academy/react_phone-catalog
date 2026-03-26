import { useTranslation } from 'react-i18next';
import { Dropdown } from 'primereact/dropdown';
import styles from './CatalogControls.module.scss';

interface CatalogControlsProps {
  sortBy: string;
  perPage: number;
  onUpdate: (key: string, value: string) => void;
}

const PER_PAGE_OPTIONS = [
  { label: '8', value: 8 },
  { label: '16', value: 16 },
  { label: '32', value: 32 },
];

export const CatalogControls = ({ sortBy, perPage, onUpdate }: CatalogControlsProps) => {
  const { t } = useTranslation();

  const sortOptions = [
    { label: t('catalog.sort.newest'), value: 'newest' },
    { label: t('catalog.sort.priceDesc'), value: 'priceDesc' },
    { label: t('catalog.sort.priceAsc'), value: 'priceAsc' },
  ];

  return (
    <div className={styles.controls}>
      {/* Сортування */}
      <div className={styles.group}>
        <label className={styles.label}>{t('catalog.controls.sortBy')}</label>
        <Dropdown
          value={sortBy}
          options={sortOptions}
          onChange={(e) => onUpdate('sort', e.value)}
          className={styles.dropdown}
          // Використовуємо pt (Pass Through) для кастомізації внутрішніх елементів PrimeReact, якщо треба
        />
      </div>

      {/* Кількість на сторінці */}
      <div className={styles.group}>
        <label className={styles.label}>{t('catalog.controls.itemsOnPage')}</label>
        <Dropdown
          value={perPage}
          options={PER_PAGE_OPTIONS}
          onChange={(e) => onUpdate('perPage', e.value.toString())}
          className={styles.dropdown}
        />
      </div>
    </div>
  );
};
