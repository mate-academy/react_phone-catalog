import React, { useEffect, useState } from 'react';
import styles from './Product.module.scss';
import { NavLink } from 'react-router-dom';

type ProductType = {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
};

type Props = {
  type: string;
};

export const Product: React.FC<Props> = ({ type }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productCount, setProductCount] = useState<string>('all');

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const number = products.filter(product => product.category === type).length;
  let count = 1;

  return (
    <>
      <div className={styles.main}>
        <div className={styles.home}>
          <NavLink to="/">
            <img src="/img/home_icon.svg" alt="button" />
          </NavLink>
          <NavLink to="/">
            <img src="/img/arrow_right.svg" alt="button" />
          </NavLink>
          <h1 className={styles.home_text}>{type}</h1>
        </div>

        <h1 className={styles.title}>
          {type === 'phones' ? `Mobile phones` : type}
        </h1>
        <p className={styles.title_descript}>{number} models</p>

        <div className={styles.sorting}>
          <div>
            <p className={styles.sorting_title}>Sort by</p>
            <select className={styles.sorting_block}>
              <option value="">Select</option>
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>
          <div>
            <p className={styles.sorting_title}>Items on page</p>
            <select
              className={styles.sorting_block}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setProductCount(e.target.value);
              }}
            >
              <option value="all">all</option>
              <option value="16">16</option>
              <option value="8">8</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.catalog}>
        {products.map(product => {
          if (
            (product.category === type && count <= Number(productCount)) ||
            productCount === 'all'
          ) {
            count++;

            return (
              <div key={product.id} className={styles.product}>
                <div className={styles.product_block}>
                  <img
                    src={product.image}
                    alt=""
                    className={styles.product_block_img}
                  />
                </div>
                <p className={styles.product_title}>{product.name}</p>
                <p className={styles.product_price}>${product.price}</p>
                <div className={styles.product_border}></div>
                <table className={styles.product_table}>
                  <tr>
                    <td className={styles.product_table_title}>Screen</td>
                    <td className={styles.product_table_mean}>
                      {product.screen}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.product_table_title}>Capacity</td>
                    <td className={styles.product_table_mean}>
                      {product.capacity}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.product_table_title}>RAM</td>
                    <td className={styles.product_table_mean}>{product.ram}</td>
                  </tr>
                </table>
                <div className={styles.product_buttons}>
                  <button className={styles.product_buttons_cart}>
                    Add to cart
                  </button>
                  <button className={styles.product_buttons_like}>
                    <img src="/img/buttons/PhoneCatalogHeart.svg" alt="" />
                  </button>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </>
  );
};
