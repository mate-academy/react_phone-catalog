import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { UsersChoiceContextProvider } from './context/UsersChoiceContext';
import App from './App';

ReactDOM.render(
  <UsersChoiceContextProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </UsersChoiceContextProvider>,
  document.getElementById('root'),
);
