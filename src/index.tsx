import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { CartProvider } from './storage/CartContext';
import { FavProvider } from './storage/FavContext';
import { PageSizeProvider } from './storage/PageSizeContext';
import { NotificationProvider } from './storage/NotificationContext';
import { ModalProvider } from './storage/ModalContext';

ReactDOM.render(
  <Router>
    <ModalProvider>
      <NotificationProvider>
        <PageSizeProvider>
          <CartProvider>
            <FavProvider>
              <Root />
            </FavProvider>
          </CartProvider>
        </PageSizeProvider>
      </NotificationProvider>
    </ModalProvider>
  </Router>,
  document.getElementById('root'),
);
