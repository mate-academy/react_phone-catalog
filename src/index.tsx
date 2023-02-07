import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CartAndFavProvider } from './context/CartAndFavContext';

ReactDOM.render(
  <Router>
    <CartAndFavProvider>
      <App />
    </CartAndFavProvider>
  </Router>,
  document.getElementById('root'),
);
