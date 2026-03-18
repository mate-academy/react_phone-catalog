import { Filter } from '../../../types/types';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import styles from './Pagetoolbar.module.scss';

type Props = {
  breadcrumbs?: boolean;
  title: string;
  subtitle?: string;
  filters?: Filter[];
  clearFilters?: () => void;
};

export const Pagetoolbar = ({
  breadcrumbs,
  title,
  subtitle,
  filters,
  clearFilters,
}: Props) => {
  return (
    <div className={styles.toolbar}>
      {breadcrumbs && <Breadcrumbs />}
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
      </div>
      {filters && (
        <div className={styles.inline}>
          {filters.map((item, index) => {
            return (
              <Select
                key={index}
                options={item.options}
                title={item.title}
                placeholder={item.placeholder}
                value={item.value}
                onChange={item.onChange}
                hasDefaultValue={item.hasDefaultValue}
              />
            );
          })}

          {filters.some(
            item => item.value !== null && !item.hasDefaultValue,
          ) && (
            <Button color="#D64545" onClick={() => clearFilters?.()}>
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
