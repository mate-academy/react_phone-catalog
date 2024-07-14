import { App } from './App';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { PhonesPage } from './modules/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { HomePage } from './modules/HomePage';
/* import { NotFoundPage } from './modules/NotFoundPage;' */


export const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/home" component={HomePage} />
          <Route path="/phones" component={PhonesPage} />
          <Route path="/tablets" component={TabletsPage} />
          <Route path="/accessories" component={AccessoriesPage} />
          {/* <Route path="*" component={NotFoundPage} /> */}
        </Switch>
      </div>
    </Router>
  );
};
