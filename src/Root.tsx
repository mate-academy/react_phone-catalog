import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './Components/NotFoundPage';
import { Homepage } from './Components/Homepage/Homepage';
import { PhonesPage } from './Components/PhonesPage/PhonesPage';
import { TabletPage } from './Components/TabletPage/TabletPage';
import { AccessoriesPage } from './Components/AccessoriesPage/AccessoriesPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="home" element={<Navigate to={'/'} replace />} />

          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />

          {/* <Route path="favourites" element={<Favourites />} />
          <Route path="phones" element={<PhonesPage />} /> */}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
