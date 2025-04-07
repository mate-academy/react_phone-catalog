import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { HomePageCategory } from './modules/HomePageCategory';
import { DetailsPage } from './modules/DetailsPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to={'/'} replace />} />
          <Route path="phones" element={<HomePageCategory url='phones'/>}>
            <Route path=":productId" element={<DetailsPage />} />
          </Route>
          <Route path="accessories" element={<HomePageCategory url='accessories'/>}>
            <Route path=":productId" element={<DetailsPage />} />
          </Route>
          <Route path="tablets" element={<HomePageCategory url='tablets'/>}>
            <Route path=":productId" element={<DetailsPage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
