import { useCallback } from 'react';
import { auth } from '../config/firebase';
import {
  syncUserCartToFirebase,
  syncUserFavoritesToFirebase,
} from '../utils/userDataSync';

export const useServerSync = () => {
  const syncCartToServer = useCallback(async () => {
    if (auth.currentUser) {
      try {
        await syncUserCartToFirebase(auth.currentUser.uid);
      } catch (error) {
        console.error('Failed to sync cart to server:', error);
      }
    }
  }, []);

  const syncFavoritesToServer = useCallback(async () => {
    if (auth.currentUser) {
      try {
        await syncUserFavoritesToFirebase(auth.currentUser.uid);
      } catch (error) {
        console.error('Failed to sync favorites to server:', error);
      }
    }
  }, []);

  return {
    syncCartToServer,
    syncFavoritesToServer,
  };
};
