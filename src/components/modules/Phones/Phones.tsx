import { useEffect } from 'react';
import { PhoneCard } from '../../shared/PhoneCard/PhoneCard';
import './Phones.style.scss';

import { ShopItem } from '../../../types/ShopItem';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loadPhones } from '../../../features/PhonesSlice/PhonesSlice';

export const Phones = () => {
  const dispatch = useAppDispatch();
  const phonesList = useAppSelector(state => state.phones.phones);

  useEffect(()=> {
    dispatch(loadPhones());
  },[]);

  return (
    <div className='phone-catalog'>
      {phonesList.length > 0 &&
        phonesList.map((phone: ShopItem) => {
          return <PhoneCard key={phone.id} phone={phone} />;
        })}
    </ div>
  );
};
