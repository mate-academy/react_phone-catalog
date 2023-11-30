// import rootReducers from '../reducers';

// convert object to string and store in localStorage
export function saveToLocalStorage(localkey: string, state: {}) {
  try {
    localStorage.setItem(localkey, JSON.stringify(state));
  } catch (e) {
    // console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
export function loadFromLocalStorage() {
  try {
    const cardState = localStorage.getItem('card');
    const favouritesState = localStorage.getItem('favourites');

    if (cardState === null || favouritesState === null) {
      return undefined;
    }

    return JSON.parse(cardState) || JSON.parse(favouritesState);
  } catch (e) {
    return undefined;
  }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
