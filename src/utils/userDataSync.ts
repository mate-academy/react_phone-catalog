import { get, ref, set, update } from 'firebase/database';
import { database } from '../config/firebase';
import { NICE_GADGETS_STORE } from '../hooks/useCartAndFavorites';

interface UserData {
  userName: string;
  email: string;
  inCart: Record<string, number>;
  inFav: string[];
}

export const getLocalStorageData = () => {
  try {
    const cartData = localStorage.getItem(NICE_GADGETS_STORE.CART);
    const favoritesData = localStorage.getItem(NICE_GADGETS_STORE.FAVORITES);

    const cart =
      cartData && cartData !== 'undefined' ? JSON.parse(cartData) : {};
    const favorites =
      favoritesData && favoritesData !== 'undefined' ?
        JSON.parse(favoritesData)
      : [];

    return { cart, favorites };
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return { cart: {}, favorites: [] };
  }
};

export const saveUserToFirebase = async (
  uid: string,
  userData: Partial<UserData>,
) => {
  const userRef = ref(database, `users/${uid}`);
  await set(userRef, userData);
};

export const updateUserInFirebase = async (
  uid: string,
  updates: Partial<UserData>,
) => {
  const userRef = ref(database, `users/${uid}`);
  await update(userRef, updates);
};

export const getUserFromFirebase = async (
  uid: string,
): Promise<UserData | null> => {
  const userRef = ref(database, `users/${uid}`);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    return snapshot.val() as UserData;
  }

  return null;
};

export const syncUserData = async (
  uid: string,
  displayName: string,
  email: string,
  isNewUser: boolean,
) => {
  const { cart, favorites } = getLocalStorageData();

  if (isNewUser) {
    const newUserData: UserData = {
      userName: displayName,
      email: email,
      inCart: cart,
      inFav: favorites,
    };

    await saveUserToFirebase(uid, newUserData);

    console.log('New user created with localStorage data synced');
  } else {
    const existingUser = await getUserFromFirebase(uid);

    if (existingUser) {
      const mergedCart = { ...existingUser.inCart, ...cart };
      const mergedFavorites = [
        ...new Set([...existingUser.inFav, ...favorites]),
      ];

      if (Object.keys(cart).length > 0 || favorites.length > 0) {
        await updateUserInFirebase(uid, {
          inCart: mergedCart,
          inFav: mergedFavorites,
        });

        localStorage.removeItem(NICE_GADGETS_STORE.CART);
        localStorage.removeItem(NICE_GADGETS_STORE.FAVORITES);

        console.log('Existing user data synced with localStorage');
      }
    }
  }
};

export const loadUserDataToStore = async (uid: string) => {
  const userData = await getUserFromFirebase(uid);

  if (userData) {
    localStorage.setItem(
      NICE_GADGETS_STORE.CART,
      JSON.stringify(userData.inCart || {}),
    );
    localStorage.setItem(
      NICE_GADGETS_STORE.FAVORITES,
      JSON.stringify(userData.inFav || []),
    );

    return userData;
  }

  return null;
};

export const clearUserCartInFirebase = async (uid: string) => {
  try {
    await updateUserInFirebase(uid, { inCart: {} });
    console.log('Cart cleared in Firebase for user:', uid);
  } catch (error) {
    console.error('Error clearing cart in Firebase:', error);
    throw error;
  }
};

export const clearUserFavoritesInFirebase = async (uid: string) => {
  try {
    await updateUserInFirebase(uid, { inFav: [] });
    console.log('Favorites cleared in Firebase for user:', uid);
  } catch (error) {
    console.error('Error clearing favorites in Firebase:', error);
    throw error;
  }
};

export const syncUserCartToFirebase = async (uid: string) => {
  try {
    const localData = getLocalStorageData();
    await updateUserInFirebase(uid, { inCart: localData.cart });
    console.log('Cart synced to Firebase for user:', uid);
  } catch (error) {
    console.error('Error syncing cart to Firebase:', error);
  }
};

export const syncUserFavoritesToFirebase = async (uid: string) => {
  try {
    const localData = getLocalStorageData();
    await updateUserInFirebase(uid, { inFav: localData.favorites });
    console.log('Favorites synced to Firebase for user:', uid);
  } catch (error) {
    console.error('Error syncing favorites to Firebase:', error);
  }
};

// Функция для очистки поврежденных данных в localStorage
export const clearCorruptedLocalStorage = () => {
  try {
    const cartData = localStorage.getItem(NICE_GADGETS_STORE.CART);
    const favoritesData = localStorage.getItem(NICE_GADGETS_STORE.FAVORITES);

    if (cartData === 'undefined' || cartData === null) {
      localStorage.removeItem(NICE_GADGETS_STORE.CART);
    }

    if (favoritesData === 'undefined' || favoritesData === null) {
      localStorage.removeItem(NICE_GADGETS_STORE.FAVORITES);
    }
  } catch (error) {
    console.error('Error clearing corrupted localStorage:', error);
    localStorage.removeItem(NICE_GADGETS_STORE.CART);
    localStorage.removeItem(NICE_GADGETS_STORE.FAVORITES);
  }
};
