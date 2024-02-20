export function getLocalStorigeData(key: string) {
  const data = localStorage.getItem(key);

  if (!data) {
    return null;
  }

  try {
    const preparedData = JSON.parse(data);

    return preparedData;
  } catch (err) {
    localStorage.removeItem(key);

    return null;
  }
}
