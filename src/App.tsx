import { Outlet } from 'react-router-dom';
// import './App.scss';
import './styles/global.scss';
import { Layout } from './components/Layout';

export const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
