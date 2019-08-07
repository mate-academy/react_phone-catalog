import React from 'react'
import PhoneDetailsPage from './PhoneDetailsPage'
import {
  Switch,
  Route,
  Link
} from 'react-router-dom'

const PhoneCatalog = ({phones}) => (
  <div>
    <ul>
      {
        phones.map(phone => (
          <li>
            <Link
              to={`/phones/${phone.id}`}
            >
              {phone.name}
            </Link>
          </li>
        ))
      }
    </ul>

    <Switch>
      <Route path='/phones/:id?' render={({ match }) =>
        <PhoneDetailsPage 
          phones={phones}
          id={match.params.id}
        />
      } />
    </Switch>
  </div>
)

export default PhoneCatalog