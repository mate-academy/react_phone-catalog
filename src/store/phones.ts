import { AnyAction } from 'redux';
import { Phone } from '../interfaces';

 const SET_PHONES = 'SET_PHONES';

 export const setPhones = (phones: Phone[]) => ({ type: SET_PHONES, payload: phones });

 const reducer = (phones = [], action: AnyAction) => {
   switch (action.type) {
     case SET_PHONES:

       return action.payload;

     default:
       return phones;
   }
 };

 export default reducer;
