import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Root } from './Root';
import { StateProvider } from './modules/hooks/SelectionState';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <Router>
    <StateProvider>
      <Root />
    </StateProvider>
  </Router>,
);
