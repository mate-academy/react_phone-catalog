import { App } from './App';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

export const Root = () => {
  return (
    <Router>
      <React.Fragment /> {/* // USED TO AVOID LINTIG ISSUES !!!!! */}
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  );
};
