import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Loader from './Loader';
import { getPhones } from './sources';

const PhonesPage = ( props ) => {
  const [phones, setPhones] = useState([]);
  useEffect(() => {
    (async () => {
      const phonesFromServer = await getPhones();
      setPhones(phonesFromServer);
    })();
  }, []);
  console.log(props);
  return (
    <>
    <h1>Phone page</h1>
    <ul>
      {phones.map(phone => (
        <li>
          <Link
            to={`${props.match.path}/${phone.id}`}
            className="link"
          >
          {phone.name}
          </Link>
        </li>
      ))}
    </ul>
    </>
  )
}

export default PhonesPage;
