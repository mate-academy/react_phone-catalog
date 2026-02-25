import { Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';

export const App = () => (
  <div className="App">
    <Layout>
      <Outlet />
    </Layout>
  </div>
);
