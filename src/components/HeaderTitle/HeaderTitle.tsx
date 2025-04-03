import styles from './HeaderTitle.module.scss';

export const HeaderTitle = () => {
  return (
    <div className={`${styles.header_title_container}`}>
      <h1 className={`${styles.header_title}`}>
        Welcome to Nice Gadgets store!
      </h1>
    </div>
  );
};
