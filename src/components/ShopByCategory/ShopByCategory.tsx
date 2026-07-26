import { useEffect, useMemo, useState } from 'react';
import styles from './ShopByCategory.module.scss';

import PhonesImg from '../../UI/Buttons/Icons/Phones.svg';
import TabletsImg from '../../UI/Buttons/Icons/Tablets.svg';
import AccessoriesImg from '../../UI/Buttons/Icons/Phones2.svg';

export const ShopByCategory = () => {
  const categorys = useMemo(() => {
    return ['phones', 'tablets', 'accessories'];
  }, []);
  const [productsCount, setProductsCount] = useState<{ [key: string]: number }>(
    {},
  );

  useEffect(() => {
    Promise.all(
      categorys.map(category =>
        fetch(`${import.meta.env.BASE_URL}api/${category}.json`)
          .then(res => res.json())
          .then(data => [category, data.length] as [string, number]),
      ),
    ).then(results => setProductsCount(Object.fromEntries(results)));
  }, [categorys]);

  const categories = [
    {
      key: 'phones',
      title: 'Mobile phones',
      bgColor: '#6d6474',
      imgSrc: PhonesImg,
      imgClass: 'homePage__categoryProducts_item_cover_img_phones',
    },
    {
      key: 'tablets',
      title: 'Tablets',
      bgColor: '#8d8d92',
      imgSrc: TabletsImg,
      imgClass: 'homePage__categoryProducts_item_cover_img_tablets',
    },
    {
      key: 'accessories',
      title: 'Accessories',
      bgColor: '#973d5f',
      imgSrc: AccessoriesImg,
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
              <h2 className={styles.homePage__categoryProducts_item_info_title}>
                {cat.title}
              </h2>
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
