import React from 'react';
import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PhonesPage from './components/PhonesPage';
import NotFoundPage from './components/NotFoundPage';
import Nav from './components/Nav';

const App = () => (
  <Router>
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />

          <Route
            path="/phones"
            render={({ match, location, history }) => (
              <PhonesPage
                match={match}
                location={location}
                history={history}
              />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  </Router>
);

export default App;
