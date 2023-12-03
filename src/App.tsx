import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
