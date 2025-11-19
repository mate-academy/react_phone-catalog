import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  return (
    <div className={styles.homePage__categoryProducts}>
      <h2 className={styles.homePage__categoryProducts_title}>
        Shop by category
      </h2>

      <div className={styles.homePage__categoryProducts_list}>
        <div className={styles.homePage__categoryProducts_item}>
          <div
            className={styles.homePage__categoryProducts_item_cover}
            style={{ backgroundColor: '#6d6474' }}
          >
            <img
              src="/img/category-phones.png"
              alt="Cover Img"
              className={
                styles.homePage__categoryProducts_item_cover_img +
                ' ' +
                styles.homePage__categoryProducts_item_cover_img_phones
              }
            />
          </div>
          <div className={styles.homePage__categoryProducts_item_info}>
            <h1 className={styles.homePage__categoryProducts_item_info_title}>
              Mobile phones
            </h1>
            <p
              className={
                styles.homePage__categoryProducts_item_info_description
              }
            >
              98 models
            </p>
          </div>
        </div>

        <div className={styles.homePage__categoryProducts_item}>
          <div
            className={styles.homePage__categoryProducts_item_cover}
            style={{ backgroundColor: '#8d8d92' }}
          >
            <img
              src="/img/category-tablets.png"
              alt="Cover Img"
              className={
                styles.homePage__categoryProducts_item_cover_img +
                ' ' +
                styles.homePage__categoryProducts_item_cover_img_tablets
              }
            />
          </div>
          <div className={styles.homePage__categoryProducts_item_info}>
            <h1 className={styles.homePage__categoryProducts_item_info_title}>
              Tablets
            </h1>
            <p
              className={
                styles.homePage__categoryProducts_item_info_description
              }
            >
              24 models
            </p>
          </div>
        </div>

        <div className={styles.homePage__categoryProducts_item}>
          <div
            className={styles.homePage__categoryProducts_item_cover}
            style={{ backgroundColor: '#973d5f' }}
          >
            <img
              src="/img/category-accessories.png"
              alt="Cover Img"
              className={
                styles.homePage__categoryProducts_item_cover_img +
                ' ' +
                styles.homePage__categoryProducts_item_cover_img_accessories
              }
            />
          </div>
          <div className={styles.homePage__categoryProducts_item_info}>
            <h1 className={styles.homePage__categoryProducts_item_info_title}>
              Accessories
            </h1>
            <p
              className={
                styles.homePage__categoryProducts_item_info_description
              }
            >
              100 models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;
