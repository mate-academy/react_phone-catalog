import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import './style.scss';

import {
  Footer, Header, Spinner, Notification,
} from '../../libs/components';
import {
  StateContext,
} from '../../libs/components/state-provider/state-context';

export const App = () => {
  const { isLoading, errorMessage } = useContext(StateContext);

  if (isLoading) {
    return <Spinner isOverflow />;
  }

  if (errorMessage) {
    return <Notification message={errorMessage} isOverflow />;
  }

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
