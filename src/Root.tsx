import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { AppProvider } from './store/AppProvider/AppProvider';

export const Root = () => (
  <Router>
    <AppProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />

          <Route index element={<HomePage />} />
          {/* <Route index path="/(home|menu| )/" element={<HomePage />} /> */}
          {/* <Route path="phones" element={ } />
        <Route path="tablets" element={ } />
        <Route path="accessories" element={ } />
        <Route path="favorites" element={ } />
        <Route path="cart" element={ } /> */}

          {/* <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route> */}
        </Route>
      </Routes>
    </AppProvider>
  </Router>
);
