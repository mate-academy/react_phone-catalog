import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { Layout } from './shared/Layout';
import { HomePage } from './modules/HomePage';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/phones" element={<p>not completed</p>} />
        <Route
          path="*"
          element={<img src="/img/page-not-found.png" alt="Page not found" />}
        />
      </Routes>
    </Layout>
  );
};
