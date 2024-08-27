import { Route, Router, Routes } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { App } from './App';
import { AppProvider } from './context/AppContext';
import { HomePage } from './modules/HomePage';
import PhonesPage from './modules/PhonesPage/PhonesPage';
import TabletsPage from './modules/TabletsPage/TabletsPage';
import AccessoriesPage from './modules/AccessoriesPage/AccessoriesPage';

export const Root = () => {
  <ThemeProvider>
    <AppProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
        </Route>
      </Routes>
    </Router>
    </AppProvider>
  </ThemeProvider>
};
