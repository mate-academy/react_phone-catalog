function read(key: string) {
  const data = window.localStorage.getItem(key);

  try {
    return data && JSON.parse(data);
  } catch (error) {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function write(key: string, data: any) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function init(key: string, initialData: any) {
  if (!read(key)) {
    write(key, initialData);
  }
}
