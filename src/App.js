import React from 'react';
import './App.css';
import Phones from './Phones';
import Phone from './Phone';
import Home from './Home';
import Basket from './Basket';
import NotFoundPage from './NotFoundPage';
import { Route, NavLink, Switch } from 'react-router-dom';

class App extends React.Component {
  state = {
    selectedPhones: [],
  };

  componentDidMount() {
    const savedPhones = JSON.parse(localStorage.getItem('selectedPhones'));
      if (savedPhones){
        this.setState({selectedPhones: savedPhones});
      }
  };

  componentDidUpdate(prevState) {
    const {selectedPhones} = this.state;
    if (prevState.selectedPhones !== selectedPhones){
      this.saveToLocalStorage();
    }
  };

  saveToLocalStorage() {
    const selectedPhones = JSON.stringify(this.state.selectedPhones);
    localStorage.setItem('selectedPhones', selectedPhones);
  };

  handlePhoneAdd = (data) => {
    this.setState((prevState) => {
      const updatedPhones = prevState.selectedPhones
        .find(phone => phone.id === data.id)
        ? (
          prevState.selectedPhones.map(phone => (
            phone.id === data.id
              ? {
                ...phone,
                quantity: phone.quantity + 1,
              }
              : phone
          ))
        ) : (
          [...prevState.selectedPhones, {
            id: data.id,
            name: data.name,
            quantity: 1,
            imageUrl: data.imageUrl || data.images[0],
            snippet: data.snippet || data.description,
          }]
        );

      return {
        selectedPhones: updatedPhones,
      };
    });
  };

  increaseQuantity = ( data) => (
    this.setState((prevState) => {
      const increasedItem = prevState.selectedPhones
        .filter(phone => phone.id === data)[0];
        increasedItem.quantity += 1;
      return { selectedPhones: prevState.selectedPhones };
    })
  );

  decreaseQuantity = (data) => (
    this.setState((prevState) => {
      const decreasedItem = prevState.selectedPhones
        .filter(phone => phone.id === data)[0];
        decreasedItem.quantity -= 1;
      return {
        selectedPhones: prevState.selectedPhones
          .filter(phone => phone.quantity > 0),
      };
    })
  );

  handleItemDelete = (data) => {
    const {selectedPhones} = this.state;
    this.setState({
      selectedPhones: selectedPhones.filter(phone => phone.id !== data)
    });
  };

  render() {
    const {selectedPhones} = this.state;
    return (
      <div className="header">
        <nav>
          <ul>
            <li className="navigation__link"><NavLink to="/" exact >Home</NavLink></li>
            <li className="navigation__link"><NavLink to="/phones" >Phones</NavLink></li>
            <li className="navigation__link"><NavLink to="/basket" >Basket</NavLink>
            </li>
            <span className="navigation__link-counter">
              {selectedPhones.length > 0 ? selectedPhones.length  : ''}
            </span>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/phones/" exact render ={() =>
            <Phones
              handleClick={this.handlePhoneAdd}
            />
            }
          />
          <Route path="/basket/" render ={() =>
            <Basket
              selectedPhones={selectedPhones}
              handleItemDelete={this.handleItemDelete}
              increaseQuantity={this.increaseQuantity}
              decreaseQuantity={this.decreaseQuantity}
            />
            }
          />
          <Route path="/phones/:phoneId" render = {({match}) =>
            <Phone
              phoneId={match.params.phoneId}
              handleClick={this.handlePhoneAdd}
            />
          }
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  };
}

export default App;
