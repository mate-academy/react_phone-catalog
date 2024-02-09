import { useContext } from 'react';
import { PhonesContext } from '../storage/phonesContext';

export const usePhones = () => useContext(PhonesContext);
