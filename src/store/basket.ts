import { AnyAction } from 'redux';
import { Phone } from '../interfaces';
import { Basket } from '../interfaces';
import { removeDuplicates } from '../helpers/removeDuplicates';
 const SET_BASKET = 'SET_BASKET';
 const REMOVE__ITEM = 'REMOVE__ITEM';

 export const setBasket = (basketItem: Phone) => ({ type: SET_BASKET, payload: basketItem });
 export const removeItem = (id: string) => ({ type: REMOVE__ITEM, payload: id });

 let initState: Basket[] = [];

 if (localStorage.getItem('cart')) {
  initState = [...JSON.parse(localStorage.getItem('cart') || '')];
}


 const reducer = (basketItems: Basket[] = initState, action: AnyAction) => {
   switch (action.type) {
     case SET_BASKET:
       return [
         ...removeDuplicates(basketItems, action.payload),
        ];
        case REMOVE__ITEM:
          console.log(action.payload)
          return [
            ...removeDuplicates(basketItems, action.payload),
           ];

     default:
       return basketItems;
   }
 };

 export default reducer;
