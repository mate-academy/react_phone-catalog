import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { AccessoriesPage } from '@pages/AccessoriesPage/AccessoriesPage';
import { NotFound } from '@pages/ErrorsPage/NotFound';
import { PhonePage } from '@pages/PhonePage/PhonePage';
import { TabletPage } from '@pages/TabletPage/TabletPage';

import { ROUTES } from '@utils/constants/routes';

const categoryComponents: Record<string, FC> = {
  [ROUTES.PHONES]: PhonePage,
  [ROUTES.TABLETS]: TabletPage,
  [ROUTES.ACCESSORIES]: AccessoriesPage,
};

export const CategoryPage: FC = () => {
  const { category } = useParams<{ category: string }>();

  const SelectedComponent =
    category && categoryComponents[category]
      ? categoryComponents[category]
      : NotFound;

  return <SelectedComponent />;
};
