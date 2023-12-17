// import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './App.scss';
import { Main } from './components/Main/Main';

const App = () => (
  <body>
    <Header />
    <Main />
    <Footer />
  </body>
);

export default App;
