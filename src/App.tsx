import { Outlet } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header/Header';
import { Container } from './components/Container/Container';
import { Notification } from './components/Notification/Notification';
import { Modal } from './components/Modal/Modal';
import { ContactForm } from './components/ContactForm/ContactForm';
import { Footer } from './components/Footer/Footer';

const App = () => {
  return (
    <div className="app">
      <Header />

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
