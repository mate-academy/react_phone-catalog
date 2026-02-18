import { Link } from 'react-router-dom';
import { selectPreparedProducts } from '../selectors/productsSelectors';
import cn from 'clsx';
import { useGetProductsQuery } from '../services/productsApi';
import { useSelector } from 'react-redux';
import type { FC } from 'react';
import type { RootState } from '../store';
import { CategoriesType } from '../constants/categories';
import { Category } from '../types';

type Props = {
  categories: CategoriesType;
  className?: string;
};

export const Categories: FC<Props> = ({ categories, className }) => {
  useGetProductsQuery();

  const phonesCount = useSelector((state: RootState) =>
    selectPreparedProducts(state, Category.Phones),
  ).length;

  const tabletsCount = useSelector((state: RootState) =>
    selectPreparedProducts(state, Category.Tablets),
  ).length;

  const accessoriesCount = useSelector((state: RootState) =>
    selectPreparedProducts(state, Category.Accessories),
  ).length;

  const categoriesCounts = {
    Phones: phonesCount,
    Tablets: tabletsCount,
    Accessories: accessoriesCount,
  };

  return (
    <section className={cn('', className)}>
      <h2 className="text-h2 text-primary dark:text-d-white">
        Shop by category
      </h2>

      <ul className="pageGrid mt-6">
        {categories.map(({ title, href, image }) => {
          const categoryCount = categoriesCounts[title];

          return (
            <li key={title} className="group col-span-4 xl:col-span-8">
              <Link to={href} className="flex flex-col">
                <div
                  className={`relative overflow-hidden before:block before:pb-[100%] before:content-[""]`}
                  style={{ backgroundColor: image.bg }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="absolute top-[10%] left-[27%] size-full origin-bottom-right object-contain object-bottom-left transition-transform group-hover:scale-105"
                  />
                </div>
                <h4 className="text-h4 text-primary dark:text-d-white mt-6">
                  {title}
                </h4>
                <p className="text-body text-secondary dark:text-d-secondary mt-1">
                  {categoryCount} {categoryCount === 1 ? 'model' : 'models'}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
