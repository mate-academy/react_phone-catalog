import styles from './HeaderTitle.module.scss';

export const HeaderTitle = () => {
  return (
    <div className={`${styles.header_title_container}`}>
      <h1 className={`${styles.header_title}`}>
        Product Catalog
      </h1>
    </div>
  );
};
