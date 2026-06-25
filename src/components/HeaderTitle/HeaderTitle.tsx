import styles from './HeaderTitle.module.scss';

const HeaderTitle = () => {
  return (
    <header className={`${styles.header_title_container}`}>
      <h1 className={`${styles.header_title}`}>Product Catalog</h1>
    </header>
  );
};

export default HeaderTitle;
