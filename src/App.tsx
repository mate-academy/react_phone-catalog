import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import { Container } from './components/Container';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};
