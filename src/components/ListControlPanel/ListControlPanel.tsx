import { CustomSelect } from '../CustomSelect';
import styles from './ListControlPanel.module.scss';

const sortOptions = [
  { label: 'Newest', value: 'new' },
  { label: 'Alphabetically', value: 'alph' },
  { label: 'Cheapest', value: 'cheap' },
];
const parPageOptions = [
  { label: 'All', value: 'all' },
  { label: '4', value: '4' },
  { label: '8', value: '8' },
  { label: '16', value: '16' },
];

export const ListControlPanel = () => {
  return (
    <div className={styles.list_settings}>
      <div className={styles.list_settings__sort}>
        <CustomSelect label="Sort by" options={sortOptions} />
      </div>
      <div className={styles.list_settings__per_page}>
        <CustomSelect label="Items on page" options={parPageOptions} />
      </div>
    </div>
  );
};
