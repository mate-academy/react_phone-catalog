import { useEffect, useState } from 'react';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const categorys = ['phones', 'accessories', 'tablets'];
  const [productsCount, setProductsCount] = useState<{ [key: string]: number }>(
    {},
  );

  useEffect(() => {
    Promise.all(
      categorys.map(category =>
        fetch(`/public/api/${category}.json`)
          .then(res => res.json())
          .then(data => [category, data.length] as [string, number]),
      ),
    ).then(results => setProductsCount(Object.fromEntries(results)));
  }, []);

  const categories = [
    {
      key: 'phones',
      title: 'Mobile phones',
      bgColor: '#6d6474',
      imgSrc: '/src/UI/Buttons/Icons/Phones.svg',
      imgClass: 'homePage__categoryProducts_item_cover_img_phones',
    },
    {
      key: 'tablets',
      title: 'Tablets',
      bgColor: '#8d8d92',
      imgSrc: '/src/UI/Buttons/Icons/Tablets.svg',
      imgClass: 'homePage__categoryProducts_item_cover_img_tablets',
    },
    {
      key: 'accessories',
      title: 'Accessories',
      bgColor: '#973d5f',
      imgSrc: '/src/UI/Buttons/Icons/Phones2.svg',
      imgClass: 'homePage__categoryProducts_item_cover_img_accessories',
    },
  ];

  return (
    <div className={styles.homePage__categoryProducts}>
      <h2 className={styles.homePage__categoryProducts_title}>
        Shop by category
      </h2>

      <div className={styles.homePage__categoryProducts_list}>
        {categories.map(cat => (
          <div className={styles.homePage__categoryProducts_item} key={cat.key}>
            <div className={styles.homePage__categoryProducts_item_cover}>
              <img
                src={cat.imgSrc}
                alt="Cover Img"
                className={
                  styles.homePage__categoryProducts_item_cover_img +
                  ' ' +
                  styles[cat.imgClass]
                }
              />
            </div>

            <div className={styles.homePage__categoryProducts_item_info}>
              <h1 className={styles.homePage__categoryProducts_item_info_title}>
                {cat.title}
              </h1>
              <p
                className={
                  styles.homePage__categoryProducts_item_info_description
                }
              >
                {productsCount[cat.key] ?? 0} models
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
