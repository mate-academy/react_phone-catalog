import React from 'react';
import { NavLink } from "react-router-dom";
import { GIT_HUB_H2ASH } from '../components/constants';

const HomePage = () => (
  <div className="wrapper_home home">
    <section>
      <h1>Welcome to phone shop!</h1>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium beatae porro laudantium rem sint! Atque eos fugit sapiente. Iusto magni laudantium, dolorum adipisci ducimus modi vitae dolorem repellendus excepturi amet.</div>
      <button>
        <NavLink
          to="/phones/"
          href="#"
        >
          Watch phones
        </NavLink>
      </button>
    </section>
    <div>
      <NavLink
        to="/"
        exact
        href="#"
      >
        <img
          src={`${GIT_HUB_H2ASH}/react_phone-catalog/img/phone_2x.gif`} 
          alt=""
        />
      </NavLink> 
    </div>
  </div>
);

export default HomePage;
