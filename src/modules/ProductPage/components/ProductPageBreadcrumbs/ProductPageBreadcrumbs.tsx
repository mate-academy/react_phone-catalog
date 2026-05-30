import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { categories } from '@/modules/shared/constants/categories';
import { BreadcrumbUI } from '@/modules/shared/types/BreadcrumbUI';
import { CategoryUI } from '@/modules/shared/types/CategoryUI';
import { Category } from '@/types/Category';
import { FC } from 'react';

interface Props {
  category: Category;
  productName: string;
}

export const ProductPageBreadcrumbs: FC<Props> = ({
  category,
  productName,
}) => {
  const categoryUI: Pick<CategoryUI, 'title' | 'path'> = categories.find(
    cat => cat.type === category,
  ) as CategoryUI;

  const paths: BreadcrumbUI[] = [
    {
      label: categoryUI.title,
      path: categoryUI.path,
    },
    {
      label: productName,
      path: null,
    },
  ];

  return <Breadcrumbs paths={paths} />;
};
