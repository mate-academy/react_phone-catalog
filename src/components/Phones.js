import React from 'react';
import { Link } from 'react-router-dom';
import { getPhones, getPhoneDetails } from '../api/getPhones';

class Phones extends React.Component {
  state = {
    phones: [],
  }

  async componentDidMount() {
    const phones = await getPhones();

    this.setState({
      phones,
    })
  }

  render() {
    const { phones } = this.state;

    return (
      <div className="phones-catalog">
        <form className="search-form">
          <label>
            Search:
         <input class="form-control search-phone" type="text" placeholder=""></input>
          </label>
          <label> Sort by:
          <select class="form-control sort-phone">
              <option>Newest</option>
              <option>Alphabetical</option>
            </select>
          </label>
        </form>
        <ul className="phones-info">
          {phones.map(phone => (
            <li key={phone.id} className="phones">
              <section className="phones-content">
                <Link to={`/phones/${phone.id}`}>
                  <img
                    className="phones-image"
                    src={phone.imageUrl}
                    alt={phone.name}
                  />
                </Link>

                <div className="phones-item">
                  <p className="phones-name">
                    <Link
                      className="phones-title"
                      to={`/phones/${phone.id}`}
                    >
                      {phone.name}
                    </Link>
                  </p>
                  <span>{phone.snippet}</span>
                </div>
              </section>
            </li>
          ))}
        </ul>
      </div>
    )
  }
};

export default Phones;
