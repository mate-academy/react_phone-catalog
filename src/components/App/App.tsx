import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from '../../Routes/HomePage/HomePage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
      </Routes>
    </div>
  );
};

export default App;
