import React from 'react';
import { Link } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { getPhones } from '../api/utils';

class PhonesPage extends React.Component {
  state = {
    phones: [],
    isLoading: true,
  }

  async componentDidMount() {
    const phonesFromApi = await getPhones();

    this.setState({
      phones: phonesFromApi,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, phones } = this.state;

    return (
      <div className="PhonesPage">

        <div className="PhonesPage__sorting">

          <div className="search">
            <span>Search:</span>
            <input
              className="search__fieled"
              type="search"
              placeholder="Tap for searching"
            />
          </div>

          <div>
            <span>Sort by:</span>
            <select>
              <option value="">Newest</option>
              <option value="">Alphabetial</option>
            </select>
          </div>

        </div>

        {isLoading && (
          <Loader
            type="Oval"
            color="rgb(22, 105, 105)"
            height="50"
            width="50"
            className="loader"
          />
        )}

        <ul className="catalog">
          {phones.map(phone => (
            <li key={phone.id}>
              <div className="phone">

                <Link to={`/phones/${phone.id}`}>
                  <div>
                    <img
                      className="phone__img"
                      src={phone.imageUrl}
                      alt="Phone"
                    />
                  </div>
                </Link>

                <div>
                  <Link
                    to={`/phones/${phone.id}`}
                    className="phone__description"
                  >
                    {phone.name}
                  </Link>
                  <p>{phone.snippet}</p>
                </div>

              </div>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default PhonesPage;
