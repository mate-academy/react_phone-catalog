/* eslint-disable */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FullCatalog from './FullCatalog';
import PhoneInfo from './PhoneInfo';

class Catalog extends React.Component {


  render() {
    return (
      <Switch>
        <Route  exact path='/catalog' component={FullCatalog}/>
        <Route path="/catalog/:phoneId?" component={PhoneInfo}/>
      </Switch>
    );
  }
}

export default Catalog;
