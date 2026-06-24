import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslations } from 'use-intl';
import cn from 'clsx';
import { selectPreparedProducts } from '../../ProductsPage/selectors/productsSelectors';
import { useGetProductsQuery } from '../../ProductsPage/services/productsApi';
import type { FC } from 'react';
import type { RootState } from '../../../store';
import { Category, Sort } from '../../../types';
import { CategoriesType } from '../constants/categories';

type Props = {
  categories: CategoriesType;
  className?: string;
};

export const Categories: FC<Props> = ({ categories, className }) => {
  useGetProductsQuery();

  const { totalProducts: phonesCount } = useSelector((state: RootState) =>
    selectPreparedProducts(state, Category.Phones, Sort.Age, Infinity, 1, ''),
  );

  const { totalProducts: tabletsCount } = useSelector((state: RootState) =>
    selectPreparedProducts(state, Category.Tablets, Sort.Age, Infinity, 1, ''),
  );

  const { totalProducts: accessoriesCount } = useSelector((state: RootState) =>
    selectPreparedProducts(
      state,
      Category.Accessories,
      Sort.Age,
      Infinity,
      1,
      '',
    ),
  );

  const categoriesCounts = {
    Phones: phonesCount,
    Tablets: tabletsCount,
    Accessories: accessoriesCount,
  };

  const tNav = useTranslations('nav');
  const tComp = useTranslations('components');
  const tProd = useTranslations('products');

  return (
    <section className={cn('', className)}>
      <h2 className="text-h2 text-primary dark:text-d-white">
        {tComp('shopByCategory')}
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
                  {tNav(title.toLowerCase())}
                </h4>
                <p className="text-body text-secondary dark:text-d-secondary mt-1">
                  {tProd('modelCount', { count: categoryCount })}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
