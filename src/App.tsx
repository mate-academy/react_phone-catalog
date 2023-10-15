import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Container } from './components/Container';
import { Notification } from './components/Notification';
import { Modal } from './components/Modal';
import { ContactForm } from './components/ContactForm';

const App = () => {
  return (
    <div className="app">
      <Navigation />

      <Container>
        <Outlet />
      </Container>

      <Notification />

      <Modal>
        <ContactForm />
      </Modal>

      <Footer />
    </div>
  );
};

export default App;
