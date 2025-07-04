import { AppRoutes } from './routes';
import { GlobalProvider } from './context/GlobalContext';

export const App = () => {
  return (
    <GlobalProvider>
      <AppRoutes />
    </GlobalProvider>
  );
};

/* app.get('/script.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/script.js');
});
*/
