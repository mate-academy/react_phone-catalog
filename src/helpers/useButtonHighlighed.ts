import { useEffect, useState } from 'react';

export function useButtonHighlighed(count: number) {
  const [isBtnHighlighed, setIsBtnHighlighed] = useState(false);

  useEffect(() => {
    if (count === 0) {
      return () => {};
    }

    setIsBtnHighlighed(true);

    const timer = setTimeout(() => {
      setIsBtnHighlighed(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [count]);

  return isBtnHighlighed;
}
