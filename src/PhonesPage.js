import React, { useState, useEffect, useContext } from 'react';
import { BasketContext } from './App';
import ScrollUpButton from "react-scroll-up-button";
import { Link } from "react-router-dom";
import Loader from './Loader';
import { getPhones } from './sources';

const PhonesPage = (props) => {
  const { handleCliCkAdd, items } = useContext(BasketContext);
  const [isLoaded, setLoaded] = useState(false);
  const [phones, setPhones] = useState([]);
  const [input, setInput] = useState("");
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
    event.preventDefault();
    setInput(event.target.value);
    filteredPhones(input, phones);
  }

  const filteredPhones = (value ,phones) => {
    const result = phones.filter(phone => phone.id.toUpperCase().includes(value.toUpperCase()));
    setFiltredPhones(result);
  }

  if (!isLoaded) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <form className="search-Form">
        <input onChange ={(event) => handleChangeInput(event)} size="40" placeholder="try to find something" className="search-Phone" type="search" name="searchfield" />
      </form>

      <ul className="catalog-container">
        {filtredPhones.map(phone => (
          <li className="catalog-item">
            <Link
              to={`${props.match.path}/${phone.id}`}
              className="link card-link"
            >
              <img src={`${phone.imageUrl}`}
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

            <button disabled={items.some(item => item.id === phone.id)}
              className={`buy-button ${items.some(item => item.id === phone.id) && "disabled-button"}`}
              type="button"
              onClick={(event) => handleCliCkAdd(event, { id: phone.id, imageUrl: phone.imageUrl, count: 1 })}
            >
              {items.some(item => item.id === phone.id) ? "IN YOUR CART" : "ADD TO CART"}
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
  )
}

export default PhonesPage;
