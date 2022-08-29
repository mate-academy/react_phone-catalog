import { useContext } from 'react';
import { usersChoiceContext } from '../context/UsersChoiceContext';
import { Phone } from '../types/Phone';

export const useLikes = () => {
  const {
    likedGadgets,
    setLikedGadgets,
    likedGadgetsID,
    setLikedGadgetsID,
  }
    = useContext(usersChoiceContext);

  const localStorageHandler = (
    likedGadgetsStorage: Phone[], likedGadgetsIDStorage: string[],
  ) => {
    localStorage
      .setItem('liked_gadgets_array', JSON.stringify(likedGadgetsStorage));
    localStorage
      .setItem('liked_gadgets_id_array', JSON.stringify(likedGadgetsIDStorage));
  };

  const addToLiked = (info: Phone) => {
    if (likedGadgetsID.includes(info.id)) {
      return;
    }

    let likedGadgetsStorage = [];
    let likedGadgetsIDStorage = [];

    if (likedGadgetsID.length === 0) {
      likedGadgetsStorage = [info];
      likedGadgetsIDStorage = [info.id];
      setLikedGadgets([info]);
      setLikedGadgetsID([info.id]);
    } else {
      likedGadgetsStorage = [...likedGadgets, info];
      likedGadgetsIDStorage = [...likedGadgetsID, info.id];

      setLikedGadgets(prev => [...prev, info]);
      setLikedGadgetsID(prev => [...prev, info.id]);
    }

    localStorageHandler(likedGadgetsStorage, likedGadgetsIDStorage);
  };

  const removeFromLiked = (infoId: string) => {
    if (!likedGadgetsID.includes(infoId)) {
      return;
    }

    const likedGadgetsStorage = [...likedGadgets]
      .filter(el => el.id !== infoId);
    const likedGadgetsIDStorage = [...likedGadgetsID]
      .filter(el => el !== infoId);

    setLikedGadgets(likedGadgetsStorage);
    setLikedGadgetsID(likedGadgetsIDStorage);

    localStorageHandler(likedGadgetsStorage, likedGadgetsIDStorage);
  };

  return { addToLiked, removeFromLiked };
};
