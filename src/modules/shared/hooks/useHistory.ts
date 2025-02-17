import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface History {
  [key: string]: unknown;
}

const history: { [key: string]: History } = {};

export function resetHistory() {
  Object.keys(history).forEach(key => {
    delete history[key];
  });
}

export const useHistory = () => {
  const { pathname } = useLocation();

  const getCurrentState = useCallback((): History => {
    const currIdx = (window.history.state?.idx as number) || 0;

    const currKey = pathname + ' ' + currIdx;

    if (!Object.hasOwn(history, currKey)) {
      for (const key of Object.keys(history)) {
        const [path, idx] = key.split(' ');

        if (!(+idx || +idx === 0)) {
          break;
        }

        if (+idx === currIdx) {
          if (path === pathname) {
            break;
          }
        }

        if (+idx >= currIdx) {
          delete history[key];
        }
      }

      history[currKey] = {};
    }

    return history[currKey];
  }, [pathname]);

  const setHistoryItem = useCallback(
    <T>(key: string, value: T) => {
      getCurrentState()[key] = value;
    },
    [getCurrentState],
  );

  const getHistoryItem = useCallback(
    <T>(key: string) => {
      return getCurrentState()[key] as T | void;
    },
    [getCurrentState],
  );

  return {
    resetHistory,
    getHistoryItem,
    setHistoryItem,
  };
};
