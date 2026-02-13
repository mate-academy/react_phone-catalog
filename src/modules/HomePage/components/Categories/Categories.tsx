import classNames from 'classnames';
import styles from './Categories.module.scss';
import { CategoryTypes } from '../../../../types/CategoryTypes';
import { CategoryItem } from './components/CategoryItem/CategoryItem';
import { Image } from '../../../../types/Image';
import { useMemo } from 'react';

type UiCategory = {
  name: CategoryTypes;
  images: Image[];
  color: string;
};

const categoryList: UiCategory[] = [
  {
    name: CategoryTypes.Phones,
    images: [
      {
        url: 'img/categories/category-phones.png',
        name: 'phone__category_link',
        type: 'png',
      },
      {
        url: 'img/categories/category-phones.webp',
        name: 'phone__category_link',
        type: 'webp',
      },
    ],
    color: '#6D6474',
  },
  {
    name: CategoryTypes.Tablets,
    images: [
      {
        url: 'img/categories/category-tablets.png',
        name: 'tablets__category_link',
        type: 'png',
      },
      {
        url: 'img/categories/category-tablets.webp',
        name: 'tablets__category_link',
        type: 'webp',
      },
    ],
    color: '#8D8D92',
  },
  {
    name: CategoryTypes.Accessories,
    images: [
      {
        url: 'img/categories/category-accessories.png',
        name: 'accessories__category_link',
        type: 'png',
      },
      {
        url: 'img/categories/category-accessories.webp',
        name: 'accessories__category_link',
        type: 'webp',
      },
    ],
    color: '#973D5F',
  },
];

type Props = {
  phonesCount: number;
  tabletsCount: number;
  accessoriesCount: number;
};

export const Categories: React.FC<Props> = ({
  phonesCount,
  tabletsCount,
  accessoriesCount,
}) => {
  const listMap = useMemo(() => {
    return {
      [CategoryTypes.Phones]: phonesCount,
      [CategoryTypes.Tablets]: tabletsCount,
      [CategoryTypes.Accessories]: accessoriesCount,
    };
  }, [phonesCount, tabletsCount, accessoriesCount]);

  return (
    <div className={classNames(styles.categories)}>
      <h2 className={classNames(styles.categories__title)}>Shop by category</h2>
      <div className={classNames(styles.categories__content)}>
        {categoryList.map(cat => (
          <CategoryItem
            key={cat.name}
            name={cat.name}
            images={cat.images}
            color={cat.color}
            count={listMap[cat.name]}
          />
        ))}
      </div>
    </div>
  );
};
