import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { BreadcrumbUI } from '@/modules/shared/types/BreadcrumbUI';

const paths: BreadcrumbUI[] = [
  {
    label: 'Favourites',
    path: null,
  },
];

export const FavouritesBreadcrumbs = () => {
  return <Breadcrumbs paths={paths} />;
};
