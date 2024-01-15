/* eslint-disable global-require */
import { useEffect, useState } from 'react';
import cn from 'classnames';
import './Categories.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { getAccessories, getTablets } from '../../api/api';
import { Product } from '../../types/Product';

const images = [
  require('../../assets/categories/category-phones.png'),
  require('../../assets/categories/category-tablets.png'),
  require('../../assets/categories/category-accessories.png'),
];

const categories = ['phones', 'tablets', 'accessories'];

const getName = (i: number) => {
  return categories[i][0].toUpperCase() + categories[i].slice(1);
};

export const Categories = () => {
  const { phones } = useAppSelector(state => state.phones);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessoroies, setAccessoroies] = useState<Product[]>([]);

  // just to have correct numbers (without creating of new slicer)
  const otherProducts = async () => {
    try {
      const tabletsFromServer: Product[] = await getTablets();
      const accessFromServer: Product[] = await getAccessories();

      setTablets(tabletsFromServer);
      setAccessoroies(accessFromServer);
    } catch (error) {
      throw new Error('error');
    }
  };

  useEffect(() => {
    otherProducts();
  }, []);

  const modelsAmount = [
    phones.length,
    tablets.length,
    accessoroies.length,
  ];

  return (
    <div className="categories">
      <h1 className="categories__title title">Shop by category</h1>

      <div className="categories__categories">
        {images.map((image, i) => (
          <div className="category" key={image}>
            <Link
              className={cn('category__images-container',
                `category__images-container--${i + 1}`)}
              to={`/${categories[i]}`}
            >
              <img
                src={image}
                alt=""
                className={cn('category__image',
                  `category__image--${i + 1}`)}
              />
            </Link>

            <div className="category__content">
              <h3 className="category__name">
                {getName(i)}
              </h3>

              <p className="category__models">{`${modelsAmount[i]} models`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
