// eslint-disable-next-line
const CART_KEY = 'addCart_v1';

export const isAvailableCart = () => {
  try {
    const testKey = '__test__';

    localStorage.setItem(testKey, 'ok');
    localStorage.removeItem(testKey);

    return true;
  } catch {
    // eslint-disable-next-line no-console
    console.error('localStorage (CART) não está disponível');

    return false;
  }
};

export const setRawCart = (key, value) => {
  try {
    localStorage.setItem(key, value);

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Erro ao salvar ${key} no cart`, error);

    return false;
  }
};

export const getRawCart = key => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Erro. Não foi possível pegar o item ${key} nos cart`, error);
    alert(`Erro. Não foi possível pegar o item ${key} nos cart`);

    return null;
  }
};

export const removeRawCart = key => {
  try {
    localStorage.removeItem(key);

    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Erro ao remover ${key} do cart`, error);

    return false;
  }
};
