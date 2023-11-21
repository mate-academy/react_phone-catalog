import './App.scss';
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer/Footer';
import { Container } from './components/Container';
import { Notification } from './components/Notification';
import { Modal } from './components/Modal';
import { ContactForm } from './components/ContactForm';

const App = () => {
  return (
    <div className="page">
      <Header />

      <Container>
        <Outlet />
      </Container>

      <Notification />

      <Footer />

      <Modal>
        <ContactForm />
      </Modal>
    </div>
  );
};

export default App;
