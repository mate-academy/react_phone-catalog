import { useEffect, useState } from 'react';
import { Mobiles } from '../mobiles/Mobiles';
import { Phone } from '../../types/phone';
import { useHeaderContext } from '../../provider/HeaderContext';
import { SearchPhones } from '../searchPhones/SearchPhones';

export const PhonesTab = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const { inputValue } = useHeaderContext();

  useEffect(() => {
    fetch('../../api/products.json')
      .then(response => response.json())
      .then(data => setPhones(data));
  }, []);

  return (
    <>
      {inputValue.length ? (
        <SearchPhones phones={phones} />
      ) : (
        <Mobiles
          phones={phones}
          title="Mobile phones"
          showOldPrice={!false}
        />
      )}
    </>
  );
};
