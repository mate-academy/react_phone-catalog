import {HashRouter } from 'react-router-dom';
import { App } from './App';
import {Routes, Route} from 'react-router-dom'
import { Header } from './components/header';
import { Navigate } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { PhonePage } from './modules/PhonePage/PhonePage';
import { PageNotFound } from './modules/PageNOTFound/PageNotFound';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />

          <Route path="phones">
            <Route index element={<PhonePage/>}/>
          </Route>
          <Route path='accessories'>
            <Route index element={<AccessoriesPage/>}/>
          </Route>
          <Route path='*' element={<PageNotFound/>}/>
        </Route>
      </Routes>

    </HashRouter>
  );
}
