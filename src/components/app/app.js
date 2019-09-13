import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

import {
  HomePage, PhonesPage, BasketPage, PhoneDetailsPage, NotFoundPage,
} from '../pages';
import { getTotalBasketItems } from '../../helpers';
import Layout from '../layout';

import './styles.css';

const PageFade = props => (
  <CSSTransition
    {...props}
    classNames="fadeTranslate"
    timeout={1000}
    mountOnEnter
    unmountOnExit
  />
);

const App = ({ location }) => {
  const locationKey = location.pathname;

  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('basketItems')) {
      setBasketItems(JSON.parse(localStorage.getItem('basketItems')));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('basketItems', JSON.stringify(basketItems));
  }, [basketItems]);

  const onAddToBasket = (phoneId, phoneName) => {
    const items = [...basketItems];
    const itemIndex = items.findIndex(phone => phone.id === phoneId);

    if (itemIndex > -1) {
      items[itemIndex] = {
        ...items[itemIndex],
        quantity: items[itemIndex].quantity + 1,
      };
      setBasketItems(items);
    } else {
      setBasketItems([...items, { id: phoneId, name: phoneName, quantity: 1 }]);
    }
  };

  const onRemoveFormBasket = (phoneId) => {
    setBasketItems(
      basketItems.filter(item => item.id !== phoneId)
    );
  };

  const onChangeQuantity = (actionName, basketItemId) => {
    const items = [...basketItems];
    const itemIndex = [...basketItems]
      .findIndex(phone => phone.id === basketItemId);

    switch (actionName) {
      case 'increase':
        items[itemIndex] = {
          ...items[itemIndex],
          quantity: items[itemIndex].quantity + 1,
        };
        setBasketItems(items);
        break;
      case 'decrease':
        if (items[itemIndex].quantity >= 2) {
          items[itemIndex] = {
            ...items[itemIndex],
            quantity: items[itemIndex].quantity - 1,
          };
          setBasketItems(items);
        }

        break;
      default:
        setBasketItems(items);
    }
  };

  const totalBasketItems = getTotalBasketItems(basketItems);

  return (
    <Layout totalBasketItems={totalBasketItems}>
      <TransitionGroup>
        <PageFade key={locationKey}>
          <main className="fix-container">
            <Switch location={location}>
              <Route path="/" exact component={HomePage} />
              <Route
                exact
                path="/phones"
                render={({ match, history }) => (
                  <PhonesPage
                    match={match}
                    location={location}
                    history={history}
                    onAddToBasket={onAddToBasket}
                  />
                )}
              />
              <Route
                path="/phones/:id"
                exact
                render={({ match, history }) => (
                  <PhoneDetailsPage
                    match={match}
                    history={history}
                    onAddToBasket={onAddToBasket}
                  />
                )}
              />
              <Route
                path="/basket"
                exact
                render={() => (
                  <BasketPage
                    basketItems={basketItems}
                    onChangeQuantity={onChangeQuantity}
                    onRemoveFormBasket={onRemoveFormBasket}
                  />
                )}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </PageFade>
      </TransitionGroup>
    </Layout>
  );
};

App.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default App;
