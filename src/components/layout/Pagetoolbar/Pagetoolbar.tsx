import { Filter } from '../../../types/types';
import { Breadcrumbs } from '../../features/Breadcrumbs';
import { Select } from '../../ui/Select';
import styles from './Pagetoolbar.module.scss';

type Props = {
  breadcrumbs?: boolean;
  title: string;
  subtitle?: string;
  filters?: Filter[];
};

export const Pagetoolbar = ({
  breadcrumbs,
  title,
  subtitle,
  filters,
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
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
