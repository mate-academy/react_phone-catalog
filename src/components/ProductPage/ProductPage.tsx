import { NavLink } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { CustomDropdown } from '../CustomDropdown/CustomDropdown';

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const countOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

type CategoryType = {
  name: 'Mobile phones' | 'Tablets' | 'Accessories';
  pathTitle: 'Phones' | 'Tablets' | 'Accessories';
};

type Props = {
  category: CategoryType;
};

export const ProductPage = ({ category }: Props) => {
  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.pathHome}>
          <NavLink to="/">
            <img src="/img/icons/home.svg" alt="home" />
          </NavLink>
          <span className={styles.pathHome_title}>&gt;</span>
          <span className={styles.pathHome_title}>{category.pathTitle}</span>
        </div>
        <div className={styles.pageInfo}>
          <h1 className={styles.pageInfo_title}> {category.name}</h1>
          <span className={styles.pageInfo_counter}>xxx models</span>
        </div>
        <div className={styles.pageItems}>
          <div className={styles.dropdowns}>
            <div className={styles.dropdown}>
              <label className={styles.dropdown_label} htmlFor="sortSelect">
                Sort by
              </label>
              <CustomDropdown options={sortOptions} />
            </div>
            <div className={styles.dropdown}>
              <label className={styles.dropdown_label} htmlFor="countSelect">
                Items on page
              </label>
              <CustomDropdown options={countOptions} />
            </div>
          </div>
          {/* <ModelsSlider arrowClassName="modelsSliderArrow" /> */}
        </div>
      </div>
    </main>
  );
};
