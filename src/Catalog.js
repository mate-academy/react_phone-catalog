import React from 'react';
import getData from './Api/getData';

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
    }, 800);
  }

  render() {
    const { phones, isLoading } = this.state;

    return (
      <div className="phone-catalog">
        <div className={isLoading ? 'load' : 'load-none'}>
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
        <div className="container">
          <div className="row">
            {phones.map(phone => (
              <div className="col s12 l6 center-align">
                <div className="card hoverable medium">
                  <span className="card-title">{phone.name}</span>
                  <div className="card-image">
                    <img src={phone.imageUrl} alt={`${phone.imageUrl}`} />
                  </div>
                  <div className="card-content">
                    <p>{phone.snippet}</p>
                  </div>
                  <div className="card-action">
                    <a className="btn waves-effect waves-purple">Add to card</a>
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
