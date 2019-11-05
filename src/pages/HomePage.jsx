import React from 'react';
import { NavLink } from "react-router-dom";

const HomePage = () => (
  <div>
    <section>
      <h1>Welcome to phone shop!</h1>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium beatae porro laudantium rem sint! Atque eos fugit sapiente. Iusto magni laudantium, dolorum adipisci ducimus modi vitae dolorem repellendus excepturi amet.</div>
      <button>
        <NavLink>
          Watch phones
        </NavLink>
      </button>
    </section>
    <div>
      <NavLink>
        <img src="/img/phone_2x.gif" alt=""/>
      </NavLink>
    </div>
  </div>
);

export default HomePage;
