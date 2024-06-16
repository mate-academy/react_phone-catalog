import { useGetDataQuery } from '../../store/api/api';
// eslint-disable-next-line max-len
import { useGetAccessoriesQuery } from '../../store/api/extendedApi/accessorize';
import { useGetTabletsQuery } from '../../store/api/extendedApi/tablet';
import { Category } from './Category';

import PhoneImage from './../../images/categories/Phones.png';
import TabletImage from './../../images/categories/Tablets.png';
import AccessoriesImage from './../../images/categories/Accessories.png';
import { ICategory } from '../../utils/interfaces/ICategory';
import styles from './Categories.module.scss';

export const Categories = () => {
  const { data: phoneData, isLoading: loadingPhone } = useGetDataQuery();
  const { data: tabletsData, isLoading: loadingTablets } = useGetTabletsQuery();
  const { data: accessoriesData, isLoading: loadingAccessories } =
    useGetAccessoriesQuery();

  const categories: ICategory[] = [
    {
      id: 1,
      name: 'Mobile phones',
      image: PhoneImage,
      counts: phoneData?.length,
      link: '/phones',
      isLoading: loadingPhone,
    },
    {
      id: 2,
      name: 'Tablets',
      image: TabletImage,
      counts: tabletsData?.length,
      link: '/tablets',
      isLoading: loadingTablets,
    },
    {
      id: 3,
      name: 'Accessories',
      image: AccessoriesImage,
      counts: accessoriesData?.length,
      link: '/accessories',
      isLoading: loadingAccessories,
    },
  ];

  return (
    <section className={styles.categories}>
      <div className="container">
        <h2 className={styles.categories__title}>Shop by category</h2>
        <div className={styles.categories__wrapper}>
          {categories.map(category => (
            <Category key={category?.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
