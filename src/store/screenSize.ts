import { AnyAction } from 'redux';

 const SET_SCREEN_SIZE = 'SET_SCREEN_SIZE';

 export const setScreenSize = (width: string) => ({ type: SET_SCREEN_SIZE, payload: width });

 const reducer = (phones = [], action: AnyAction) => {
   switch (action.type) {
     case SET_SCREEN_SIZE:
       return action.payload;

     default:
       return phones;
   }
 };

 export default reducer;
