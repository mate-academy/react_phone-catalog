import React from 'react';
import PropTypes from 'prop-types';

// style
import './scss/BasketEmail.scss';
import './scss/BasketSend.scss';

class BasketEmail extends React.Component {
  state = {
    mapOfInform: {
      name: '',
      email: '',
      phone: '',
      country: '',
    },
    errorsMap: {
      name: '',
      email: '',
      phone: '',
      country: '',
    },
  }

  handleInputFocus = ({ target }) => {
    const { name } = target;

    this.setState(prevState => ({
      ...prevState,
      errorsMap: {
        ...prevState.errorsMap,
        [name]: false,
      },
    }));
  }

  handleChangeForm = (event) => {
    event.preventDefault();
    const { name, email } = this.state.mapOfInform;
    const errorsMap = {};

    this.setState((prevState) => {
      if (!name) {
        errorsMap.name = 'Please enter the name';
      }

      if (!email) {
        errorsMap.email = 'Please enter the email';
      }

      if (Object.keys(errorsMap).length > 0) {
        errorsMap.phone = 'Please enter the phone';
      }

      return {
        errors: true,
      };
    });

    this.setState({
      errorsMap,
      mapOfInform: {
        name: '',
        email: '',
        phone: '',
        country: '',
      },
    });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState(({ mapOfInform }) => ({
      mapOfInform: {
        ...mapOfInform,
        [name]: value,
      },
    }));
  }

  handleChangeName = (event) => {
    const { name, value } = event.target;

    this.setState(({ mapOfInform }) => ({
      mapOfInform: {
        ...mapOfInform,
        [name]: value.replace(/[^\w]/g, ''),
      },
    }));
  }

  render() {
    const { mapOfInform, errorsMap } = this.state;

    const {
      handleOpenFinishWindow, handleCloseRegister,
    } = this.props;

    return (
      <>
        <form
          className="email-field"
          onSubmit={this.handleChangeForm}
        >
          <div className="email__hide-login-btn">
            <button onClick={handleCloseRegister} type="button">
              <img src="img/close_icon.svg" alt="close" />
            </button>
          </div>
          <h1>Ask us how we can help you</h1>
          <p className="email-field-text">Lorem ipsum dolor sit amet</p>
          <p className="email-field-name-text">
          Enter your name
            <div className="email-field-name">

              <img src="img/user_icon.svg" alt="user icon" />
              <input
                type="text"
                min="3"
                onFocus={this.handleInputFocus}
                value={mapOfInform.name}
                name="name"
                onChange={this.handleChangeName}
              />
              {
                errorsMap.name
                  ? (
                    <div className="email-field-name error__name">
                      <h1>{errorsMap.name}</h1>
                    </div>
                  )
                  : ''
              }

            </div>
          </p>
          <p className="email-field-email email-field-name-text">
            Enter your email
            <div className="email-field-email email-field-name">
              <img src="img/email_icon.svg" alt="email icon" />
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                onFocus={this.handleInputFocus}
                onChange={this.handleChangeName}
              />
              {
                errorsMap.email
                  ? (
                    <div className="email-field-name error__name">
                      <h1>
                        {' '}
                        {errorsMap.email}
                      </h1>
                    </div>
                  )
                  : ''
              }

            </div>
          </p>
          <p className="email-field-phone email-field-name-text">
            Your phone
            <div className="email-field-phone email-field-name">
              <img
                className="email-field_option"
                src="img/FLAG.png"
                alt="flag Ukrain"
              />
              <select
                name="country"
                value={mapOfInform.name}
                onFocus={this.handleInputFocus}
                onChange={this.handleInputChange}
              >
                <option
                  value="209"
                  name="country"
                  disabled
                  selected
                  className="img"
                >
                  English
                </option>
                <option
                  value="209"
                  name="country"
                  className="img"
                >
                  Ru
                </option>
                <option
                  value="038"
                  name="country"
                  className="img"
                >
                  Ukrain
                </option>
              </select>
              <h1>{mapOfInform.country}</h1>
              <div className="divider" />
              <input
                type="number"
                name="phone"
                value={mapOfInform.phone}
                onFocus={this.handleInputFocus}
                onChange={this.handleChangeName}
              />
              {
                errorsMap.phone && (
                  <div className="email-field-name error__name">
                    <h1>
                      {' '}
                      {errorsMap.phone}
                    </h1>
                  </div>
                )}
            </div>
          </p>
          <p className="send-email">
            <button
              type="submit"
              onClick={() => handleOpenFinishWindow(mapOfInform)}
            >
              Continue
            </button>
          </p>
        </form>
      </>
    );
  }
}

BasketEmail.propTypes = {
  handleOpenFinishWindow: PropTypes.func.isRequired,
  handleCloseRegister: PropTypes.func.isRequired,
};

export default BasketEmail;
