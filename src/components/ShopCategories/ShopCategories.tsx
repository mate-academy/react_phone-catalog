import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ShopCategory from '../ShopCategory';
import Subtitle from '../Subtitle';
import style from './ShopCategories.module.scss';
import { fetchPhones } from '../../redux/features/phonesSlice';
import { fetchTablets } from '../../redux/features/tabletsSlice';
import { fetchAccessories } from '../../redux/features/accessoriesSlice';

const ShopCategories = () => {
  const dispatch = useAppDispatch();
  const { phones } = useAppSelector(state => state.phones);
  const { tablets } = useAppSelector(state => state.tablets);
  const { accessories } = useAppSelector(state => state.accessories);

  useEffect(() => {
    dispatch(fetchPhones());
    dispatch(fetchTablets());
    dispatch(fetchAccessories());
  }, [dispatch]);

  const categories = [
    {
      path: '/phones',
      title: 'Mobile phones',
      count: phones.length || 0,
      image: './img/category-phones.webp',
    },
    {
      path: '/tablets',
      title: 'Tablets',
      count: tablets.length || 0,
      image: './img/category-tablets.webp',
    },
    {
      path: '/accessories',
      title: 'Accessories',
      count: accessories.length || 0,
      image: './img/category-accessories.webp',
    },
  ];

  const showCategories = categories.map(category => (
    <ShopCategory
      key={category.title}
      path={category.path}
      title={category.title}
      count={category.count}
      image={category.image}
    />
  ));

  return (
    <div className="container">
      <section className={style.categories}>
        <div className={style.top}>
          <Subtitle text="Shop by category" />
        </div>

        <div className={style.bottom}>{showCategories}</div>
      </section>
    </div>
  );
};

export default ShopCategories;
