export function getDevices() {
  return fetch('api/products.json')
    .then(response => {
      if (!response.ok) {
      }

      return response.json();
    })
    .then(devices => {
      return devices;
    });
}

export function getDevicesProperties(type: string | undefined) {
  return fetch(`api/${type}.json`)
    .then(response => {
      if (!response.ok) {
      }

      return response.json();
    })
    .then(devices => {
      return devices;
    });
}
