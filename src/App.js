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
 * [x] - Implement a Loader to show it while 
 *      waiting for the data from server
 * [] - PhoneDetailsPage + router
 *    [] - прокинуть расширенные данные
 *       
 * 
 */

class App extends React.Component {
  state = {
    phones: '',
    isLoading: false,
    isLoaded: false,
  }

  loadData = async () => {
    this.setState({
      isLoading: true,
    })

    const responsePhones = await
      fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json')
    const phones = await responsePhones.json();

    setTimeout(() => {
      this.setState({
        phones: phones,
        isLoading: false,
        isLoaded: true,
      })
    }, 1500)
  }

  render() {
    const {phones, isLoading, isLoaded} = this.state;

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
          <Route path='/phones/' exact render={() =>
            <PhonesPage 
              loadData={this.loadData}
              phones={phones}
              isLoading={isLoading}
              isLoaded={isLoaded}
            />
          }/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    )
  }
}

export default App;
