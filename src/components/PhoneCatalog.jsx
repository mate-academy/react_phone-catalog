import React from 'react'
import {
  Link
} from 'react-router-dom'

const PhoneCatalog = ({
  phones,
}) => (
  <div>
    <ul className='listOfPhones'>
      {
        phones.map(phone => (
          <li className='listOfPhones__item'>
              <img 
                className='listOfPhones__item-img'
                src={`${phone.imageUrl}`} 
                alt="altImg"
                />
               <Link
                 className='listOfPhones__item-link'
                 to={`/phones/${phone.id}`}
               >
                 {phone.name}
              </Link>
              <section className='listOfPhones__item-snippet'>
                {phone.snippet}
              </section>
          </li>
        ))
      }
    </ul>
  </div>
)

export default PhoneCatalog