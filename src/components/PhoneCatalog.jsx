import React from 'react'
import {
  Link
} from 'react-router-dom'

const PhoneCatalog = ({
  phones, 
}) => (
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
  </div>
)

export default PhoneCatalog