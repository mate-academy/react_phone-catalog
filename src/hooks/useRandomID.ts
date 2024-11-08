import { useEffect, useState } from 'react';

import { generateRandomID } from '@utils/helpers/generateRandomID';

export const useRandomID = (itemID: string | undefined) => {
  const [randomID, setRandomID] = useState<number | null>(null);

  useEffect(() => {
    if (itemID) {
      const newRandomID = generateRandomID();
      setRandomID(newRandomID);
    } else {
      setRandomID(null);
    }
  }, [itemID]);

  return randomID;
};
