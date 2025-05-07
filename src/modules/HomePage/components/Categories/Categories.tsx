import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import classNames from 'classnames';
import { getProductsQuantityByCategory } from '../../../../utils/api';
import { useEffect, useState } from 'react';

const phonesImg = 'img/categories/phones-category.png';
const tabletsImg = 'img/categories/tablets-category.png';
const accessoriesImg = 'img/categories/accessories-category.png';

export const Categories = () => {
  const [phonesQuantity, setPhonesQuantity] = useState<number>(0);
  const [tabletsQuantity, setTabletsQuantity] = useState<number>(0);
  const [accessoriesQuantity, setAccessoriesQuantity] = useState<number>(0);

  useEffect(() => {
    const fetchProductQuantities = async () => {
      const { phones, tablets, accessories } =
        await getProductsQuantityByCategory();

      setPhonesQuantity(phones);
      setTabletsQuantity(tablets);
      setAccessoriesQuantity(accessories);
    };

    fetchProductQuantities();
  });

  const categories = [
    {
      name: 'phones',
      img: phonesImg,
      title: 'Mobile phones',
      quantity: phonesQuantity,
    },
    {
      name: 'tablets',
      img: tabletsImg,
      title: 'Tablets',
      quantity: tabletsQuantity,
    },
    {
      name: 'accessories',
      img: accessoriesImg,
      title: 'Accessories',
      quantity: accessoriesQuantity,
    },
  ];

  return (
    <section className={styles.categories}>
      <h2 className={styles.categories__title}>Shop by category</h2>
      <div className={styles.categories__wrapper}>
        {categories.map(category => (
          <Link to={`/${category.name}`} key={category.name}>
            <img
              src={category.img}
              alt={category.name}
              className={styles.categories__img}
            />
            <h4>{category.title}</h4>
            <p className={classNames('body-text', styles.categories__text)}>
              {category.quantity} models
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
