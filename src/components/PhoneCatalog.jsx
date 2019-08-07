import React from 'react'

const PhoneCatalog = ({phones}) => (
  <ul>
    {
      phones.map(phone => (
        <li>{phone.name}</li>
      ))
    }
  </ul>
)

export default PhoneCatalog