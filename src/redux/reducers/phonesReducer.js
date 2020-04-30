/* eslint-disable no-case-declarations */
import { getPhones } from '../../api/api';
import { SET_PHONES, TOGGLE_IS_FETCHING, ADD_TO_CART } from './constants';
import { setPhonesAC, toggleIsFetchingAC } from './actionCreators';

const initialState = {
  phones: [],
  isFetching: false,
  addedPhones: [
    {
      age: 0,
      id: 'motorola-xoom-with-wi-fi',
      imageUrl: 'img/phones/motorola-xoom-with-wi-fi.0.jpg',
      name: 'Motorola XOOM™ with Wi-Fi',
    },
  ],
  totalPrice: 0,
  itemPrice: 799,
  price: 799,
};

export const phonesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHONES:
      return {
        ...state,
        phones: [...action.phones],
      };

    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case ADD_TO_CART:
      const addedPhone = state.phones.find(phone => phone.id === action.id);

      return {
        ...state,
        addedPhones: [...state.addedPhones, addedPhone],
        totalPrice: state.totalPrice + state.price,
      };
    default:
      return state;
  }
};

export const getPhonesThunkCreator = () => (dispatch) => {
  dispatch(toggleIsFetchingAC(true));

  getPhones()
    .then(data => {
      dispatch(toggleIsFetchingAC(false));
      dispatch(setPhonesAC(data));
    });
};
