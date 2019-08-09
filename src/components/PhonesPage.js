import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from './Loader';
import PhoneCatalog from './PhoneCatalog';
import PhoneDetailsPage from './PhoneDetailsPage';
import Filter from './Filter';
import Basket from './Basket';

const PhonesPage = () => {
  useEffect(() => {
    fetchPhones();
    setPhonesLoader(true);
  }, []);
  const [phones, setPhones] = useState([]);
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [phonesLoaded, setPhonesLoader] = useState(false);
  const [basketItems, setBasketItems] = useState([]);

  const fetchPhones = async() => {
    try {
      // eslint-disable-next-line max-len
      const data = await fetch('https://mate-academy.github.io/phone-catalogue-static/api/phones.json');
      const phonesData = await data.json();

      setPhones(phonesData);
      setFilteredPhones(phonesData);
    } catch (error) {
      setPhones([]);
    }
  };

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

  const onFilterPhones = (event) => {
    setFilteredPhones(phones.filter(phone => (
      phone.name.toLowerCase()
        .search(event.target.value.toLowerCase()) !== -1
    )));
  };

  const sortByName = () => {
    setFilteredPhones([...phones].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const sortByAge = () => {
    setFilteredPhones([...phones].sort((a, b) => a.age - b.age));
  };

  const onSortPhonesBy = (event) => {
    switch (event.target.value) {
      case 'name':
        sortByName();
        break;
      case 'age':
        sortByAge();
        break;
      default:
        sortByAge();
    }
  };

  return (
    <section className="section">
      <div className="sidebar">
        <Filter
          onFilterPhones={onFilterPhones}
          onSortPhonesBy={onSortPhonesBy}
        />
        <Basket
          basketItems={basketItems}
          onChangeQuantity={onChangeQuantity}
          onRemoveFormBasket={onRemoveFormBasket}
        />
      </div>
      <div>
        <h1 className="title indent-mb-m">Phone catalog</h1>
        {
          phonesLoaded
            ? (
              <div>
                <Switch>
                  <Route
                    path="/phones/:id"
                    exact
                    component={PhoneDetailsPage}
                  />
                  <Route
                    path="/phones:queryParams?"
                    exact
                    render={() => (
                      <PhoneCatalog
                        phones={filteredPhones}
                        onAddToBasket={onAddToBasket}
                      />
                    )}
                  />
                </Switch>
              </div>
            ) : (
              <Loader />
            )
        }
      </div>
    </section>
  );
};

export default PhonesPage;
