export function getDevices() {
  return fetch('http://localhost:3000/api/products.json')
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
  return fetch(`http://localhost:3000/api/${type}.json`)
    .then(response => {
      if (!response.ok) {
      }

      return response.json();
    })
    .then(devices => {
      return devices;
    });
}
