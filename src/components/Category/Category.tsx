import React, { useEffect, useState } from 'react';
import style from './Category.module.scss';
import { ProductType } from '../../types/ProductType';
import { getProducts } from '../../api/serviceApi';
import { Link } from 'react-router-dom';
import { Categories } from '../../enums/Categories';

export const Category: React.FC = () => {
  const [productList, setProductList] = useState<ProductType[]>([]);

  const phonesQuantity = productList.filter(
    product => product.category === 'phones',
  ).length;

  const tabletsQuantity = productList.filter(
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
        <h2 className={style.category_title}>Shop by category</h2>

        <div className={style.category__content}>
          <Link
            to={Categories.PHONES}
            style={{ textDecoration: 'none' }}
            className={style.category__content__items}
          >
            <div className={style.category__content__items__imgs}>
              <img
                src="./img/category/mobile-category.png"
                alt="Mobiles"
                className={style.category__container__content__items__imgs_img}
              />
            </div>

            <div className={style.category__content__items__descriptions}>
              <h4
                className={
                  style.category__content__items__descriptions_description
                }
              >
                Mobile phones
              </h4>
              <p
                className={style.category__content__items__descriptions_models}
              >
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
                src="./img/category/tablet-category.png"
                alt="Tablet"
                className={style.category__content__items__imgs_img}
              />
            </div>

            <div className={style.category__content__items__descriptions}>
              <h4
                className={
                  style.category__content__items__descriptions_description
                }
              >
                Tablets
              </h4>
              <p
                className={style.category__content__items__descriptions_models}
              >
                {tabletsQuantity} models
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
                src="./img/category/accessories-category.png"
                alt="Accessories"
                className={style.category__content__items__imgs_img}
              />
            </div>

            <div className={style.category__content__items__descriptions}>
              <h4
                className={
                  style.category__content__items__descriptions_description
                }
              >
                Accessories
              </h4>
              <p
                className={style.category__content__items__descriptions_models}
              >
                {accessoriesQuantity} models
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
