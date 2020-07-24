import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import phonesReducer from './phones';
import screenSizeReducer from './screenSize';
export type RootState = ReturnType<typeof rootReducer>;

export const getPhones = (state: RootState) => state.phones;
export const getScreen = (state: RootState) => state.screen;

const rootReducer = combineReducers({
  phones: phonesReducer,
  screen: screenSizeReducer,
});

const store = createStore(
  rootReducer,
 composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
