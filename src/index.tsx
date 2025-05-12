//import { createRoot } from 'react-dom/client';
//import { App } from './App';

//createRoot(document.getElementById('root') as HTMLElement).render(<App />);
import { createRoot } from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

//import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Provider } from 'react-redux';
import { store } from './app/store';

import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          

          {/* <Route index element={<PeoplePage />} /> */}
          {/* <Route path=":slug" element={<PeoplePage />} /> */}
          {/* </Route> */}
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </Router>
    ,
  </Provider>,
);
