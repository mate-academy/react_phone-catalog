import { Breadcrumbs } from '../../features/Breadcrumbs';
import { Select } from '../../ui/Select';
import styles from './Pagetoolbar.module.scss';

type Filter = {
  title: string;
  list: string[] | number[];
};

type Props = {
  path?: string;
  title: string;
  subtitle?: string;
  filters?: Filter[];
};

export const Pagetoolbar = ({ title, subtitle, filters }: Props) => {
  return (
    <div className={styles.toolbar}>
      <Breadcrumbs />
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
      </div>
      {filters && (
        <div className={styles.inline}>
          {filters.map((filter, index) => {
            return <Select key={index} filter={filter} />;
          })}
        </div>
      )}
    </div>
  );
};
