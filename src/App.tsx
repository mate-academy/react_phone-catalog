import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/header';
import { Home } from './pages/home/Home';

const App = () => (
  <div className="App">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
);

export default App;
