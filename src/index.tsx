import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import './style.css';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(<Root />);
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
