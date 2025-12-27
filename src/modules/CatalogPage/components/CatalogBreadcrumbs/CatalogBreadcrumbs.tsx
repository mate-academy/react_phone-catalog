import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { BreadcrumbUI } from '@/modules/shared/types/BreadcrumbUI';
import { FC } from 'react';

interface Props {
  category: string;
}

export const CatalogBreadcrumbs: FC<Props> = ({ category }) => {
  const paths: BreadcrumbUI[] = [
    {
      label: category,
      path: null,
    },
  ];

  return <Breadcrumbs paths={paths} />;
};
