const API_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products';

export function getPhones() {
  return fetch(`${API_URL}.json`)
    .then(res => res.json());
}

export function getTargetDevice(deviceId: string) {
  return fetch(`${API_URL}/${deviceId}.json`)
    .then(res => res.json());
}
