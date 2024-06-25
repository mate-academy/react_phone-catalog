import React, { ComponentPropsWithoutRef, FC } from 'react';
import {
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Accessories, Phones, Tablets } from '../modules/Category';
import { Home } from '../modules/Home';
import { Layout } from '../modules/Layout';
import { NotFound } from '../modules/NotFound';
import {
  Phones as PhoneDetails,
  Tablets as TabletDetails,
  Accessories as AccessoryDetails,
} from '../modules/Phones';
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
              <Route index element={<Phones />} />
              <Route
                path=":productId"
                element={<PhoneDetails />}
                handle={{
                  crumb: () => <ProductDetailsCrumb param="productId" />,
                }}
              />
            </Route>
            <Route
              handle={{
                crumb: () => 'Tablets',
              }}
              path="Tablets"
            >
              <Route index element={<Tablets />} />
              <Route
                path=":productId"
                element={<TabletDetails />}
                handle={{
                  crumb: () => <ProductDetailsCrumb param="productId" />,
                }}
              />
            </Route>
            <Route
              handle={{
                crumb: () => 'Accessories',
              }}
              path="Accessories"
            >
              <Route index element={<Accessories />} />
              <Route
                path=":productId"
                element={<AccessoryDetails />}
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
