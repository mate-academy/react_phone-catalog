import React, { useState, useEffect } from 'react';
import './PhonesPage.css';
import { Loader } from 'semantic-ui-react';
import { getPhones } from '../../Api';
import PhoneCatalog from '../phoneCatalog/PhoneCatalog';

const loadPhonesFromServer = async (setPhones, setLoading) => {
  setLoading(true);
  const phones = await getPhones();

  setPhones(phones);
  setLoading(false);
};

const PhonesPage = ({ AddPhoneToBasketList }) => {
  const [phones, setPhones] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadPhonesFromServer(setPhones, setLoading);
  }, []);

  return (
    <>
      {isLoading && <div className="loadContainer"><Loader active inline /></div>}

      <PhoneCatalog phones={phones || []} AddPhoneToBasketList={AddPhoneToBasketList} />
    </>
  );
};

export default PhonesPage;
