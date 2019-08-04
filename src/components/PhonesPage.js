import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Loader from './Loader';
import { getPhones } from '../api/getPhones';
import NotFoundPage from './NotFoundPage';
import PhoneDetails from './PhoneDetails';
import SearchPanel from "./SearchPanel";

export default class PhonesPage extends Component {
  state = {
    phones: [],
  }

  async componentDidMount() {
    const data = await getPhones();

    this.setState({ phones: data });
  }

  render() {
    console.log(this.props.match);
    const { phones } = this.state;

    return (
      <>
        {this.state.phones.length < 1 ? (
          <Loader />
        ) : (
          <>
            <SearchPanel />
            <h2>Phones Page</h2>
            <ul className="phones-list">
              {phones.map(phone => (
                <li key={phone.id} className="phones-item">
                  <section className="phones-item-info">
                    <Link to={`/phones/${phone.id}`}>
                      <img
                        style={{height: '100%'}}
                        className="phones-main-photo"
                        src={phone.imageUrl}
                        alt={phone.name}
                      />
                    </Link>

                    <div className="phones-item-text">
                      <h3>
                        <Link className="phones-item-title" to={`/phones/${phone.id}`}>{phone.name}</Link>
                      </h3>
                      <p>{phone.snippet}</p>
                    </div>
                  </section>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    );
  }
}
