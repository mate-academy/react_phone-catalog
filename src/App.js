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

/**
 * [x] - переделать стиль CSS, чтобы без bootstrap
 * [x] - передать функцию компоненту PhonePage
 * [] - Implement a Loader to show it while 
 *      waiting for the data from server
 */

class App extends React.Component {
  state = {
    phones: '',
  }

  loadData = async () => {
    const responsePhones = await
      fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json')
    const phones = await responsePhones.json();

    this.setState({
      phones: phones,
    })
  }

  render() {
    return (
      <div>
        <nav className="nav-menu-header">
              <NavLink 
                className="nav-menu-header__item"
                href="#"
                exact to='/'
              >
                  Home
              </NavLink>

              <NavLink 
                className="nav-menu-header__item" 
                href="#"
                to='/phones'
              >
                Phones
              </NavLink>
        </nav>

        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/phones/' render={({ match }) =>
            <PhonesPage 
              loadData={this.loadData}
              phones={this.state.phones}
            />
          }/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    )
  }
}

export default App;
