import { Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { CataloguePage } from './components/CataloguePage/CataloguePage';
import { ItemPage } from './components/ItemPage';
import { LikedPage } from './components/LikedPage';
import { CardPage } from './components/CardPage';
import { LikedIdProvider } from './utils/context';

export const Root = () => {
  return (
    <LikedIdProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home">
              <Route index element={<HomePage />} />
            </Route>
            <Route path=":category">
              <Route index element={<CataloguePage />} />
              <Route path=":itemName" element={<ItemPage />} />
            </Route>
            <Route path="liked" element={<LikedPage />} />
            <Route path="card" element={<CardPage />} />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/menu" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </HashRouter>
    </LikedIdProvider>
  );
};
