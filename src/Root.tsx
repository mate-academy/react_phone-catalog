import { App } from './App';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
};
