import React, { useEffect } from 'react';
import style from './Categories.module.scss';
import { Link } from 'react-router-dom';
import phones from '../../assets/img/categories/Phones.png';
import tablets from '../../assets/img/categories/Tablets.png';
import accessories from '../../assets/img/categories/Accessories.png';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Product } from '../../types/Product';
import { init } from '../../features/products';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products.items);
  const loading = useAppSelector(state => state.products.loading);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const categories = [
    {
      name: 'Mobile phones',
      image: phones,
      path: '/phones',
      count: products.filter(
        (product: Product) => product.category === 'phones',
      ).length,
    },
    {
      name: 'Tablets',
      image: tablets,
      path: '/tablets',
      count: products.filter(
        (product: Product) => product.category === 'tablets',
      ).length,
    },
    {
      name: 'Accessories',
      image: accessories,
      path: '/accessories',
      count: products.filter(
        (product: Product) => product.category === 'accessories',
      ).length,
    },
  ];

  if (loading) {
    return (
      <div className={style.container}>
        <h2 className={style.title}>Shop by category</h2>
        <div className={style.categories}>
          {Array.from({ length: 3 }, (_, index) => (
            <div className={style.cart} key={index}>
              <Skeleton
                height={262}
                width={187}
                className={style.skeletonImage}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>Shop by category</h2>
      <div className={style.categories}>
        {categories.map(category => (
          <div className={style.cart} key={category.name}>
            <Link to={category.path}>
              <img
                src={category.image}
                alt={category.name}
                className={style.cart__image}
              />
              <h3 className={style.cart__name}>{category.name}</h3>
              <p className={style.cart__description}>{category.count} models</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
