import React, { FC } from 'react';
import {
  RouterProvider,
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { Layout } from './modules/Layout';
import { Home } from './modules/Home/Home';
import { NotFound } from './modules/NotFound';

import { Category } from './modules/Category';
import { CATEGORIES } from './variables/categories';
import { Icon } from './modules/shared/ui/Icon';
import { Text } from './modules/shared/ui/Text';
import { capitalize } from './helpers/capitalize';
import { selectProducts, useProducts } from './app/features/products';
import './styles/index.scss';

export const App: FC = () => {
  const { products } = useProducts(selectProducts);

  return (
    <RouterProvider
      router={createHashRouter(
        createRoutesFromElements(
          <Route
            path="/"
            handle={{ crumb: () => <Icon variant="home" /> }}
            element={<Layout />}
          >
            <Route index element={<Home />} />
            {CATEGORIES.map(category => (
              <Route
                handle={{
                  crumb: () => <Text.Small>{capitalize(category)}</Text.Small>,
                }}
                path={category}
                key={category}
              >
                <Route index element={<Category category={category} />} />
                <Route
                  path=":product-id"
                  element={<Category category={category} />}
                  handle={{
                    crumb: (pathname: string) => {
                      const foundProduct = products.find(
                        product =>
                          pathname.includes(product.itemId) &&
                          pathname.includes(product.category),
                      );

                      return (
                        <Text.Small>
                          {foundProduct
                            ? foundProduct.name
                            : capitalize(pathname)}
                        </Text.Small>
                      );
                    },
                  }}
                />
              </Route>
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>,
        ),
      )}
    />
  );
};
