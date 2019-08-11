import React from 'react';
import { NavLink } from 'react-router-dom';

import './slyles/header.css';

const Header = (props) => (
  <header className="header">
    <div className="begin" />

    <div className="logo">
      <div>&#128241;</div>
      <div>P H O N E S</div>
    </div>

    <div className="searchPannel">
      <select value={props.styleType} className="headerStyle" onChange={event => props.styleTypeChange(event.target.value)}>
        <option value="0">&#9776;</option>
        <option value="1">&#9783;</option>
      </select>

      <select value={props.sortOrder} className="headerSort" onChange={event => props.sortOrderChange(event.target.value)}>
        <option value="0">Unsorted</option>
        <option value="1">Newest first</option>
        <option value="2">Oldest first</option>
        <option value="3">Alphabetical</option>
        <option value="4">Reversed Alphabet</option>
      </select>
      <input
        className={props.searchStr ? 'searchWithText' : 'searchInput'}
        type="text"
        value={props.searchStr}
        onChange={event => props.handleSearch(event.target.value)}
      />
    </div>

    <NavLink
      to="/cart"
      exact
      className={props.cart[0] ? 'cartBTN full' : 'cartBTN'}
      activeClassName="active"
      onClick={() => props.handleSearch('')}
    >
      &#128666;
    </NavLink>

    <nav className="mainMenu">
      <NavLink
        to="/"
        exact
        className="menuLink"
        activeClassName="active"
        onClick={() => props.handleSearch('')}
      >
        Home
      </NavLink>

      <NavLink
        to="/phones"
        className="menuLink"
        activeClassName="active"
        onClick={() => props.handleSearch('')}
      >
        Phones
      </NavLink>
    </nav>
  </header>
);

export default Header;
