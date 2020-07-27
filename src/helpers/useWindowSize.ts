import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreenSize } from '../store/screenSize';
import { getScreen } from '../store/index';

export function useWindowSize() {
  const dispatch = useDispatch();
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  dispatch(setScreenSize(`${getSize().width}`));
  const windowSize = useSelector(getScreen);

  useEffect(() => {
    function handleResize() {
      dispatch(setScreenSize(`${getSize().width}`));
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
