import React, { useEffect, useState } from 'react';
import style from './Category.module.scss';
import { ProductType } from '../../types/ProductType';
import { getProducts } from '../../api/serviceApi';
import { Categories } from '../../enums/Categories';
import { Link } from 'react-router-dom';

export const Category: React.FC = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  const phonesQuantity = productList.filter(
    product => product.category === 'phones',
  ).length;

  const tavletsQuantity = productList.filter(
    product => product.category === 'tablets',
  ).length;

  const accessoriesQuantity = productList.filter(
    product => product.category === 'accessories',
  ).length;

  useEffect(() => {
    getProducts().then(product => setProductList(product));
  }, []);

  return (
    <div className={style.category}>
      <div className={style.category__container}>
        <h2 className={style.category__title}>Shop by category</h2>

        <div className={style.category__content}>
          <Link
            to={Categories.PHONES}
            style={{ textDecoration: 'none' }}
            className={style.category__content__items}
          >
            <div className={style.category__content__items__imgs}>
              <img
                src="./img/category/phones.png"
                alt="Phones"
                className={style.category__content__items__imgs_img}
              />
            </div>

            <div className={style.category__content__items__description}>
              <h4
                className={style.category__content__items__description__title}
              >
                Mobile phones
              </h4>

              <p className={style.category__content__items__description_models}>
                {phonesQuantity} models
              </p>
            </div>
          </Link>

          <Link
            to={Categories.TABLETS}
            style={{ textDecoration: 'none' }}
            className={style.category__content__items}
          >
            <div className={style.category__content__items__imgs}>
              <img
                src="./img/category/tablets.png"
                alt="Tablets"
                className={style.category__content__items__imgs_img}
              />
            </div>

            <div className={style.category__content__items__description}>
              <h4
                className={style.category__content__items__description__title}
              >
                Tablets
              </h4>

              <p className={style.category__content__items__description_models}>
                {tavletsQuantity} models
              </p>
            </div>
          </Link>

          <Link
            to={Categories.ACCESSORIES}
            style={{ textDecoration: 'none' }}
            className={style.category__content__items}
          >
            <div className={style.category__content__items__imgs}>
              <img
                src="./img/category/accessories.png"
                alt="Accessories"
                className={style.category__content__items__imgs_img}
              />
            </div>

            <div className={style.category__content__items__description}>
              <h4
                className={style.category__content__items__description__title}
              >
                Accessories
              </h4>

              <p className={style.category__content__items__description_models}>
                {accessoriesQuantity} models
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
