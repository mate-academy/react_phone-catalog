import {HashRouter } from 'react-router-dom';
import { App } from './App';
import {Routes, Route} from 'react-router-dom'
import { Header } from './components/header';
import { Navigate } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonePage } from './modules/PhonePage/PhonePage';
import { PageNotFound } from './modules/PageNOTFound/PageNotFound';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { TabletPage } from './modules/TabletPage/TabletPage';
import { DetailsProduct } from './modules/DetailsPage/DetailsProduct';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />
            <Route path=':productId' element={<DetailsProduct/>} />

          <Route path="phones">
            <Route index element={<PhonePage />} />
             <Route path=':productId' element={<DetailsProduct/>} />

          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
             <Route path=':productId' element={<DetailsProduct/>} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletPage />} />
             <Route path=':productId' element={<DetailsProduct/>} />
          </Route>
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>

    </HashRouter>
  );
}
