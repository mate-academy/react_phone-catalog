import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { StateProvider } from '../context/StateProvider';
import { App } from '../App';
import { NotFoundPage } from '../components/NotFoundPage';
import { HomePage } from '../modules/HomePage';

export function Root() {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </StateProvider>
  );
}
