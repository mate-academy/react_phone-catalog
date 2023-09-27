import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Container } from './components/Container';

const App = () => {
  return (
    <div className="app">
      <Navigation />

      <Container>
        <Outlet />
      </Container>

      <Footer />
    </div>
  );
};

export default App;
