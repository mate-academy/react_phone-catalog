import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Container } from './components/Container';
import { Notification } from './components/Notification';

const App = () => {
  return (
    <div className="app">
      <Navigation />

      <Container>
        <Outlet />
      </Container>

      <Notification />

      <Footer />
    </div>
  );
};

export default App;
