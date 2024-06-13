import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Root } from './routes/Root';

const App = () => (
  <Router>
    <Root />
  </Router>
);

createRoot(document.getElementById('root') as HTMLElement)
  .render(<App />);
