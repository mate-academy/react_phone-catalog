interface History {
  [key: string]: unknown;
}

const history: { [key: string]: History } = {};

function resetHistory() {
  Object.keys(history).forEach(key => {
    delete history[key];
  });
}

function getCurrentState(): History {
  const currentIdx = (window.history.state?.idx as number) || 0;

  if (!Object.hasOwn(history, currentIdx)) {
    history[currentIdx] = {};
  }

  return history[currentIdx];
}

function setHistoryItem<T>(key: string, value: T) {
  getCurrentState()[key] = value;
}

function getHistoryItem<T>(key: string) {
  return getCurrentState()[key] as T | void;
}

export const useHistory = () => {
  return {
    resetHistory,
    getHistoryItem,
    setHistoryItem,
  };
};
