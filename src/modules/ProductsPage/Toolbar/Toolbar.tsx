import { SortSelector } from './SortSelector';

import styles from './Toolbar.module.scss';

export const Toolbar = () => {
  return (
    <section className={styles.toolbar}>
      <SortSelector
        label="Sort by"
        param="sort"
        defaultValue="all"
        options={[
          { value: 'all', label: `Don't selected...` },
          { value: 'age', label: 'Newest' },
          { value: 'title', label: 'Alphabetically' },
          { value: 'price', label: 'Cheapest' },
        ]}
      />

      <SortSelector
        label="Items on page"
        param="perPage"
        defaultValue="all"
        options={[
          { value: 'all', label: `All` },
          { value: '4', label: '4' },
          { value: '8', label: '8' },
          { value: '16', label: '16' },
        ]}
      />
    </section>
  );
};
