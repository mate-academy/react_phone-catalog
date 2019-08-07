import React from 'react';
import './App.css';
import { Switch, Route, NavLink, Link } from 'react-router-dom';

const getPhones = async() => {
  const url = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
  const response = await fetch(url);
  const phones = await response.json();

  return phones;
}

const App = () => {
  return (
  <div className="App">
    <h1>Phone catalog</h1>

    <ul className="navigation__list">
      <li className="navigation__item">
        <NavLink to="/" exact className="navigation__link">Home</NavLink>
      </li>
      <li className="navigation__item">
        <NavLink to="/phones" className="navigation__link">Phones</NavLink>
      </li>
    </ul>

    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/phones/:phoneId?' component={({ match }) => <PhonesPage match={match}/>}/>
      <Route component={NoMatch} />
    </Switch>
  </div>
)}

const HomePage = () => (
  <div>
    <h1>Home, sweet Home!</h1>

    <img
      src="https://66.media.tumblr.com/f0b5d6c86300e5f06abd78c0d22069db/tumblr_p1bb8pVdc61wljtfbo1_500.gif"
      alt="gif"
    />
  </div>
)

class PhonesPage extends React.Component {
  state={
    phones: [],
    isLoading: false,
  }

  async componentDidMount () {
    this.setState({isLoading: true});

    const temp = await getPhones();

    this.setState({
      phones: temp,
      isLoading: false,
    })
  }

  render() {
    const{ isLoading, phones } = this.state;
    const loaderUrl = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a8510e58638001.5a038683ab457.gif';

    const { phoneId } = this.props.match.params;
    const phone = phones.find(phone => phone.id === phoneId);

    return(
      <div>
        <Switch>
          <Route
            path={`/phones/${phoneId}`}
            component={() => (
              <PhoneDetailsPage phone={phone} phoneId={phoneId}/>
            )}
          />

          <Route
            path="/phones/"
            component={()=>(
              <div>
                <h1>Phones number: {this.state.phones.length}</h1>

                {isLoading && <img src={loaderUrl} alt="loader"/>}

                <PhoneCatalog phones={phones}/>
              </div>
            )}
          />
        </Switch>
      </div>
    )
  }
}

const PhoneCatalog = ({ phones }) => (
  <div>
    <ul>
      {phones.map(phone =>
        <li key={phone.id}>
          <Link to={`/phones/${phone.id}`}>
            <img src={phone.imageUrl} alt="phone" width="100"/>
            {phone.name}
          </Link>
        </li>
      )}
    </ul>
  </div>
);

const getPhoneDetails = async(id) => {
  const url = "https://mate-academy.github.io/phone-catalogue-static/api/phones/";
  const response = await fetch(`${url}${id}.json`);
  const phoneDetails = await response.json();

  return phoneDetails;
}

class PhoneDetailsPage extends React.Component {
  state = {
    phoneDetails: null,
  };

  async componentDidMount () {
    if (this.props.phoneId) {
      const { phoneId } = this.props;

      const temp = await getPhoneDetails(phoneId);
      this.setState({ phoneDetails: temp });
    }
  };

  render() {
    const { phone } = this.props;
    const { phoneDetails } = this.state ;
    const loaderUrl = 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/a8510e58638001.5a038683ab457.gif';

    console.log(phoneDetails);

    if (!phone) {
      return (
        <NoPhone />
      )
    }

    return (
      <div>
        <h1>{phone.name}</h1>
        <h3>{phone.snippet}</h3>

        {!phoneDetails && <img src={loaderUrl} alt="loader"/>}

        {phoneDetails && <PhoneDetails phoneDetails={phoneDetails}/>}
      </div>
    )
  }
}

class PhoneDetails extends React.Component {
  state={
    imageUrl: this.props.phoneDetails.images[0],
  }

  handleImageIndex = (event) => {
    this.setState({imageUrl: event.target.getAttribute('src')})
  }

  render() {
    const { phoneDetails } = this.props;
    const { imageUrl } = this.state;

    return (
      <div className="phone__details">
        <img src={imageUrl} alt={phoneDetails.name}/>

        {phoneDetails.images.map(imageUrl => (
          <img
            onClick = {this.handleImageIndex}
            key={imageUrl}
            src={imageUrl}
            alt={phoneDetails.name}
            className='phone__galery'
          />
        ))}

        <p>
          {phoneDetails.description}
        </p>

        <table>
          <tbody>
            <tr>
              <td>Additional Features:</td>

              <td>
                <ul>
                  <li>{phoneDetails.additionalFeatures}</li>
                </ul>
              </td>
            </tr>

            <tr>
              <td>android:</td>

              <td>
                <ul>
                  {Object.keys(phoneDetails.android)
                    .map((item, i) =>
                      <li key={i}>
                        {item}: {`${Object.values(phoneDetails.android)[i]}`}
                      </li> )}
                </ul>
              </td>
            </tr>

            <tr>
              <td>battery:</td>

              <td>
                <ul>
                  {Object.keys(phoneDetails.battery)
                    .map((item, i) =>
                      <li key={i}>
                        {item}: {`${Object.values(phoneDetails.battery)[i]}`}
                      </li> )}
                </ul>
              </td>
            </tr>

            <tr>
              <td>camera:</td>

              <td>
                <ul>
                  {Object.keys(phoneDetails.display)
                    .map((item, i) =>
                      <li key={i}>
                        {item}: {`${Object.values(phoneDetails.display)[i]}`}
                      </li> )}
                </ul>
              </td>
            </tr>

            <tr>
              <td>connectivity:</td>

              <td>
                <ul>
                  {Object.keys(phoneDetails.connectivity)
                    .map((item, i) =>
                      <li key={i}>
                        {item}: {`${Object.values(phoneDetails.connectivity)[i]}`}
                      </li> )}
                </ul>
              </td>
            </tr>

            <tr>
              <td>display:</td>

              <td>
                <ul>
                  {Object.keys(phoneDetails.display)
                    .map((item, i) =>
                      <li key={i}>
                        {item}: {`${Object.values(phoneDetails.display)[i]}`}
                      </li> )}
                </ul>
              </td>
            </tr>

            <tr>
              <td>hardware:</td>

              <td>
                <ul>
                  {Object.keys(phoneDetails.hardware)
                    .map((item, i) =>
                      <li key={i}>
                        {item}: {`${Object.values(phoneDetails.hardware)[i]}`}
                      </li> )}
                </ul>
              </td>
            </tr>

            <tr>
              <td>sizeAndWeight:</td>

              <td>
                <ul>
                  {Object.keys(phoneDetails.sizeAndWeight)
                    .map((item, i) =>
                      <li key={i}>
                        {item}: {`${Object.values(phoneDetails.sizeAndWeight)[i]}`}
                      </li> )}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>`
    </div>
    )
  }

}

const NoPhone = () => (
  <div>
    <h1>Unfortunatly there's no such phone anymore</h1>

    <img src='https://66.media.tumblr.com/976bf8cbf1bbdc68bca5aee0fd5076d2/tumblr_nkaa17TghZ1rix1r7o1_500.jpg'alt="phone"/>

    <ul>
      <li>
        <Link to="/phones/">Back To Phone Catalog</Link>
      </li>

      <li>
        <Link to="/">Back To Home</Link>
      </li>
    </ul>
  </div>
)

const NoMatch = () => (
  <div>
    <h1>404</h1>
    <img src="https://i.gifer.com/MbHR.gif" alt="You are lost" />
    <NavLink to="/" exact>Back to Home</NavLink>
  </div>
)

export default App;
