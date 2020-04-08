import React from 'react';

export const PhonesCatalog = (props) => {
  const { phones } = props;

  return (
    <>
      <ul>
        {phones.map(phone => (
          <li key={phone.id}>
            {phone.id}
            <img src={phone.imageUrl} alt="/" />
          </li>
        ))}
      </ul>
    </>
  );
};
