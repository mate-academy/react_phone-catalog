import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './shared/Header';
import HomePage from './modules/HomePage/HomePage';

export const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route
        path="*"
        element={
          <h1 style={{ textAlign: 'center', color: 'red' }}>Not found</h1>
        }
      />
    </Routes>
  </div>
);
