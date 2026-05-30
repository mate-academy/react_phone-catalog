// eslint-disable-next-line
const FAV_KEY = 'favorites_v1';

export const isAvailable = () => {
  try {
    const testKey = '__test__';

    localStorage.setItem(testKey, 'ok');
    localStorage.removeItem(testKey);

    return true;
  } catch {
    // eslint-disable-next-line no-console
    console.error('localStorage não está disponível');

    return false;
  }
};

export const setRaw = (key, value) => {
  try {
    localStorage.setItem(key, value);

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Erro. Não foi possível incluir item ${key} nos fav`, error);
    alert(`Erro. Não foi possível incluir item ${key} nos fav`);
  }
};

export const getRaw = key => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Erro. Não foi possível pegar o item ${key} nos fav`, error);
    alert(`Erro. Não foi possível pegar o item ${key} nos fav`);

    return null;
  }
};

export const removeRaw = key => {
  try {
    localStorage.removeItem(key);

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Erro. Não foi possível remover o item ${key} dos dados`,
      error,
    );
    alert(`Erro. Não foi possível remover o item ${key} dos fav`);
  }
};
