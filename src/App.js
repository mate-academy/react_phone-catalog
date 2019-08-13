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
import Basket from './components/Basket'

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
 * [x] - реализовать сортировку и поиск
 *    [х] - логика
 *    [x] - сss
 * [x] - сss отодвинуть от края поля
 * [] - корзина
 *    [x] - логика
 *    [x] - реализовать саму страницу basket
 *    [] - починить css активной корзины
 * [] - поработать над стилями всей страницы
 * [x] - исправить ссылки для github
 * [х] - исправить доп. инфу по телефонам
 * [x] - рефакторинг PhoneDetailsPage по state, loadDataDetails, очистка App
 * 
 * 
 */

class App extends React.Component {
  state = {
    phones: '',
    isLoading: false,
    isLoaded: false,
    itemsAtBasket: [],
  }

  basketManager = (id, operation) => {
    const currentIndex = this.state.itemsAtBasket
      .findIndex(element => element.id === id)

    this.setState(prevState => {
      let changedArray = [...prevState.itemsAtBasket];

      switch (operation) {
        case 'increase':
          return changedArray[currentIndex].quantity += 1;
        case 'decrease':
          changedArray[currentIndex].quantity === 1
            ? changedArray = changedArray.filter(obj => obj.id !== id)
            : changedArray[currentIndex].quantity -= 1
          break;
        case 'remove':
          changedArray = changedArray.filter(obj => obj.id !== id)
          break;
      }

      return {
        itemsAtBasket: changedArray,
      }
    })
  }

  addItemToBasket = (itemToAdd) => {
    const currentIndex = this.state.itemsAtBasket
      .findIndex(element => element.id === itemToAdd.id);
    
    if (currentIndex >= 0) {
      this.setState(prevState => {
        const changedArray = [...prevState.itemsAtBasket];
        changedArray[currentIndex].quantity += 1;

        return {
          itemsAtBasket: changedArray,
        }
      })
    } else {
      const requiredItem = {...itemToAdd};
      requiredItem.quantity = 1;
      delete requiredItem.imageUrl;
      delete requiredItem.snippet;
      delete requiredItem.age;
      delete requiredItem.carrier;
  
      this.setState(prevState => ({
        itemsAtBasket: [...prevState.itemsAtBasket, requiredItem],
      }))
    }
  }

  loadDataPhones = async () => {
    this.setState({
      isLoaded: false,
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

  render() {
    const {phones, isLoading, isLoaded, itemsAtBasket} = this.state;

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
            to='/phones/'
          >
            Phones
          </NavLink>
          
          <NavLink
            className="nav-menu-header__item basket" 
            href='#'
            to='/basket/'
          >
          </NavLink>
        </nav>

        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/phones/' exact render={() =>
            <PhonesPage 
              addItemToBasket={this.addItemToBasket}
              loadDataPhones={this.loadDataPhones}
              phones={phones}
              isLoading={isLoading}
              isLoaded={isLoaded}
            />
          }/>
          <Route path='/phones/:id?' render={({ match }) =>
            <PhoneDetailsPage
              loadDataPhones={this.loadDataPhones}
              phones={phones}
              id={match.params.id}
            />  
          } />
          <Route path='/basket/' render={() =>
            <Basket 
              itemsAtBasket={itemsAtBasket}
              basketManager={this.basketManager}
            />
          }
          />
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    )
  }
}

export default App;
