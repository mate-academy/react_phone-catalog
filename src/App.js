import React from 'react';
import './App.css';
import {
  Route,
  Switch,
  NavLink
} from 'react-router-dom'
import HomePage from './components/HomePage'
import PhonesPage from './components/PhonesPage'
import NotFoundPage from './components/NotFoundPage'

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink 
                className="nav-item nav-link"
                href="#"
                exact to='/'
              >
                  Home
              </NavLink>

              <NavLink 
                className="nav-item nav-link" 
                href="#"
                to='/phones'
              >
                Phones
              </NavLink>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/phones/' component={PhonesPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    )
  }
}

export default App;
