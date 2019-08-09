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
import PhoneDetailsPage from './components/PhoneDetailsPage'

/**
 * [x] - переделать стиль CSS, чтобы без bootstrap
 * [x] - передать функцию компоненту PhonePage
 * [x] - Implement a Loader to show it while 
 *      waiting for the data from server
 * [x] - сделать из списка блоки с информацией
 * [x] - PhoneDetailsPage + router
 *    [x] - почистить код
 *    [x] - прокинуть расширенные данные
 *    [x] - прикрутить Loader
 *      [x] - уточка, почему работает не так?
 *      [x] - создать отдельную функцию
 *      [x] - исправить старую функцию
 * [x] - сделать страницу с основной информацией
 *      текущего телефона
 * [] - в конце доделать основную информацию
 * 
 */

class App extends React.Component {
  state = {
    phones: '',
    details: '',
    isLoading: false,
    isLoaded: false,
  }

  loadDataPhones = async () => {
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
    }, 1000)
  }
  
  loadDataDetails = async () => {
    this.setState({
      isLoaded: false,
      isLoading: true,
    })

    const responseDetails = await
      fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones/motorola-xoom.json')
    const details = await responseDetails.json();

    setTimeout(() => {
      this.setState({
        details: details,
        isLoading: false,
        isLoaded: true,
      })
    }, 1000)
  }

  render() {
    const {phones, isLoading, isLoaded, details} = this.state;

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
              loadDataPhones={this.loadDataPhones}
              phones={phones}
              isLoading={isLoading}
              isLoaded={isLoaded}
            />
          }/>
          <Route path='/phones/:id?' render={({ match }) =>
            <PhoneDetailsPage 
              loadDataPhones={this.loadDataPhones}
              loadDataDetails={this.loadDataDetails}
              phones={phones}
              details={details}
              id={match.params.id}
              isLoading={isLoading}
              isLoaded={isLoaded}
            />
          } />
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    )
  }
}

export default App;
