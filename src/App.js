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

  handleClick = (data) => {
    this.setState(prevState => ({
      selectedPhones: [...prevState.selectedPhones, data],
    }))
    console.log(this.state.selectedPhones)
  };

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
            handleClick={this.handleClick}
            />
            }
          />
          <Route path="/basket/" render ={() =>
            <Basket
              selectedPhones={selectedPhones}
              handleItemDelete={this.handleItemDelete}
            />
            }
          />
          <Route path="/phones/:phoneId" component={Phone} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
    );
  };
}

export default App;
