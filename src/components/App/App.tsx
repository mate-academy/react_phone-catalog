import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from '../../Routes/HomePage/HomePage';
import { Footer } from '../Footer/Footer';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
