import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScreenSize } from '../store/screenSize';
import { getScreen } from '../store/index';

export function useWindowSize() {
  const dispatch = useDispatch();

  function getSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
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
