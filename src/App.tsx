import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer, Header } from './components';

const App = () => (
  <>
    <Header />

    <Outlet />

    <Footer />
  </>

);

export default App;
