import React from 'react';
import './App.css';
import Catalog from './Catalog';
import Details from './Details';

const App = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <section>
          <h2>Filter</h2>

          <label>
            <div>Search:</div>
            <input />
          </label>

          <label>
            <div>Sort by:</div>
            <select>
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </label>
        </section>

        <section>
          <h2>Shopping Cart</h2>
          <ul>
            <li>Phone 1</li>
            <li>Phone 2</li>
            <li>Phone 3</li>
          </ul>
        </section>
      </div>

      <div className="col-md-10">
        <Details />
        <Catalog />
      </div>
    </div>
  </div>
);

export default App;
