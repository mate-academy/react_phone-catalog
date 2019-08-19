import {
  PHONES_RECEIVED,
  ADD_TO_BASKET,
  BASKET_ITEM_INCREASED,
  BASKET_ITEM_DECREASED,
  BASKET_ITEM_REMOVED,
  FILTER_PHONES,
  SORT_BY,
} from './actions';

const initialState = {
  phones: [],
  shownPhones: [],
  basketItems: [],
  isLoadedPhones: false,
};

const reducer = (state = initialState, action) => {
  const copyBasketItems = { ...state.basketItems };

  switch (action.type) {
    case PHONES_RECEIVED:
      return {
        ...state,
        isLoadedPhones: true,
        phones: action.phones,
        shownPhones: action.phones,
      };

    case ADD_TO_BASKET:
      if (state.basketItems[action.phoneName]) {
        return {
          ...state,
          basketItems: {
            ...state.basketItems,
            [action.phoneName]: {
              ...state.basketItems[action.phoneName],
              count: state.basketItems[action.phoneName].count + 1,
            },
          },
        };
      }

      return {
        ...state,
        basketItems: {
          ...state.basketItems,
          [action.phoneName]: {
            ...state.basketItems[action.phoneName],
            id: new Date(),
            phone: action.phoneName,
            count: 1,
          },
        },
      };

    case BASKET_ITEM_INCREASED:
      return {
        ...state,
        basketItems: {
          ...state.basketItems,
          [action.phoneName]: {
            ...state.basketItems[action.phoneName],
            count: state.basketItems[action.phoneName].count + 1,
          },
        },
      };

    case BASKET_ITEM_DECREASED:
      return {
        ...state,
        basketItems: {
          ...state.basketItems,
          [action.phoneName]: {
            ...state.basketItems[action.phoneName],
            count: state.basketItems[action.phoneName].count > 1
              ? state.basketItems[action.phoneName].count - 1
              : 1,
          },
        },
      };

    case BASKET_ITEM_REMOVED:
      delete copyBasketItems[action.phoneName];

      return {
        ...state,
        basketItems: copyBasketItems,
      };

    case FILTER_PHONES:
      return {
        ...state,
        shownPhones: state.phones.filter(phone => (
          phone.name.toLowerCase().includes((action.value).toLowerCase())
        )),
      };

    case SORT_BY:
      if (action.value === 'alphabetical') {
        return {
          ...state,
          shownPhones: [...state.shownPhones].sort((a, b) => (
            a.name.localeCompare(b.name)
          )),
        };
      }

      return {
        ...state,
        shownPhones: [...state.shownPhones].sort((a, b) => a.age - b.age),
      };

    default:
      return state;
  }
};

export default reducer;
