import React, { FC } from 'react';
import {
  RouterProvider,
  Route,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';
import { Layout } from './modules/Layout';
import { Home } from './modules/Home/Home';
import { NotFound } from './modules/NotFound';
import { store } from './app/store';
import { Category } from './modules/Category';
import { CATEGORIES } from './variables/categories';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider
        router={createHashRouter(
          createRoutesFromElements(
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {CATEGORIES.map(category => (
                <Route path={category} key={category}>
                  <Route index element={<Category />} />
                  <Route
                    path=":product-id"
                    element={<Category />}
                    handle={{ crumbText: () => 'asd' }}
                  />
                </Route>
              ))}
              <Route path="*" element={<NotFound />} />
            </Route>,
          ),
        )}
      />
    </Provider>
  );
};
