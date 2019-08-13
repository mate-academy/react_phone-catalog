import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ScrollUpButton from 'react-scroll-up-button';
import { BasketContext } from './App';

import Loader from './Loader';
import { getPhones } from './sources';

const PhonesPage = (props) => {
  const { handleClickAdd, items } = useContext(BasketContext);
  const [isLoaded, setLoaded] = useState(false);
  const [phones, setPhones] = useState([]);
  const [filtredPhones, setFiltredPhones] = useState([]);

  useEffect(() => {
    (async () => {
      const phonesFromServer = await getPhones();

      setPhones(phonesFromServer);
      setFiltredPhones(phonesFromServer);
      setLoaded(true);
    })();
  }, []);
  const handleChangeInput = (event) => {
    const value = event.target.value;

    event.preventDefault();

    filteredStuffs(value, phones);
  };

  const filteredStuffs = (value, stuffs) => {
    const result = stuffs
      .filter(stuff => stuff.id.toUpperCase().includes(value.toUpperCase()));

    setFiltredPhones(result);
  };

  if (!isLoaded) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <form
        className="search-Form"
        onSubmit={event => event.preventDefault()}
      >
        <input
          onChange={event => handleChangeInput(event)}
          size="40"
          placeholder="try to find something"
          className="search-Phone"
          type="input"
          name="searchfield"
        />
      </form>

      <ul className="catalog-container">
        {filtredPhones.map(phone => (
          <li className="catalog-item">
            <Link
              to={`${props.match.path}/${phone.id}`}
              className="link card-link"
            >
              <img
                src={`${phone.imageUrl}`}
                className="product-image"
                alt={phone.id}
              />
              <p className="title">
                {phone.name}
              </p>
              <p className="overview">
                {phone.snippet}
              </p>

            </Link>

            <button
              disabled={items.some(item => item.id === phone.id)}
              className={`buy-button
              ${items.some(item => item.id === phone.id)
                && 'disabled-button'}`}
              type="button"
              onClick={event => handleClickAdd(
                event,
                { id: phone.id, imageUrl: phone.imageUrl, count: 1 },
              )}
            >
              {items.some(item => item.id === phone.id)
                ? 'IN YOUR CART'
                : 'ADD TO CART'}
            </button>

          </li>
        ))}
      </ul>

      <ScrollUpButton
        ContainerClassName="scroll-button"
        EasingType="easeInOutSine"
        StopPosition={1}
        ShowAtPosition={250}
      />
    </>
  );
};

export default PhonesPage;
