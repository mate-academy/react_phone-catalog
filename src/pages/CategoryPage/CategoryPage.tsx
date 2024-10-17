import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { AccessoriesPage } from '@pages/AccessoriesPage/AccessoriesPage';
import { NotFound } from '@pages/ErrorsPage/NotFound';
import { PhonePage } from '@pages/PhonePage/PhonePage';
import { TabletPage } from '@pages/TabletPage/TabletPage';
import { ROUTES } from '@utils/constants/routes';

export const CategoryPage: FC = () => {
  const { category } = useParams();

  switch (category) {
    case ROUTES.PHONES:
      return <PhonePage />;
    case ROUTES.TABLETS:
      return <TabletPage />;
    case ROUTES.ACCESSORIES:
      return <AccessoriesPage />;
    default:
      return <NotFound />;
  }
};
