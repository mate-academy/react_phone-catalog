import React, { ComponentPropsWithoutRef, FC } from 'react';
import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Category } from '../modules/Category';
import { Home } from '../modules/Home';
import { Layout } from '../modules/Layout';
import { NotFound } from '../modules/NotFound';
import { Phones } from '../modules/Phones';
import { Icon } from '../modules/shared/ui/Icon';
import { ProductDetailsCrumb } from './ProductDetailsCrumb';

type Props = ComponentPropsWithoutRef<typeof Route>;

export const AppRoutes: FC<Props> = ({}) => (
  <RouterProvider
    router={createHashRouter(
      createRoutesFromElements(
        <Route element={<Layout />}>
          <Route
            handle={{ crumb: () => <Icon variant="home" /> }}
            errorElement={<NotFound />}
          >
            <Route index element={<Home />} />
            <Route
              handle={{
                crumb: () => 'Phones',
              }}
              path="Phones"
            >
              <Route index element={<Category category={'phones'} />} />
              <Route
                path=":productId"
                element={<Phones />}
                handle={{
                  crumb: () => <ProductDetailsCrumb param="productId" />,
                }}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>,
      ),
    )}
  />
);
