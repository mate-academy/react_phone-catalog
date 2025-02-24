import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { Phones } from './components/Phones/Phones';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { LangProvider } from './context/LangContext';
import { Tablets } from './components/Tablets/Tablets';
import { Accessories } from './components/Accessories/Accessories';
import { PageItem } from './components/PageItem/PageItem';
import { Category } from './utils/enums';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

export const Root = () => (
  <Provider store={store}>
    <Router>
      <LangProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path={`${Category.Phones}`} element={<Phones />} />
            <Route path={`${Category.Tablets}`} element={<Tablets />} />
            <Route path={`${Category.Accessories}`} element={<Accessories />} />
            <Route path={`${Category.Phones}/:id`} element={<PageItem />} />
            <Route path={`${Category.Tablets}/:id`} element={<PageItem />} />
            <Route
              path={`${Category.Accessories}/:id`}
              element={<PageItem />}
            />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </LangProvider>
    </Router>
  </Provider>
);
