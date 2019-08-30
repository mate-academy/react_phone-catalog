import React from 'react';
import { NavLink } from 'react-router-dom';
import { getData } from './Api/getData';
import Phone from './Phone';

class Catalog extends React.Component {
  state = {
    phones: [],
    isLoading: true,
  }

  async componentDidMount() {
    const response = await getData();
    const allPhones = response.map(telephone => telephone);

    setTimeout(() => {
      this.setState({
        phones: allPhones,
        isLoading: false,
      });
    }, 1000);
  }

  addToCard(phoneId) {
    console.log(phoneId)
  }

  render() {
    const { phones, isLoading } = this.state;
    const { match } = this.props;

    return (
      <div>
        <div className={isLoading ? 'progress' : 'load-none'}>
          <div className="indeterminate" />
        </div>
        <div className="container">
          <div className="row">
            {phones.map(phone => (
              <div className="col s12 m6 l4 center-align">
                <div className="card hoverable large">
                  <NavLink key={phone.id} to={`${match.path}/${phone.id}`}>
                    <div className="card-image">
                      <img src={phone.imageUrl} alt={`${phone.imageUrl}`} />
                    </div>
                    <span className="card-title">{phone.name}</span>
                  </NavLink>
                  <div className="card-content">
                    <p>{phone.snippet}</p>
                  </div>
                  <div className="card-action">
                    <button
                      onClick={() => this.addToCard(phone.id)}
                      type="button"
                      className="btn waves-effect waves-purple"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }
}

export default Catalog;
