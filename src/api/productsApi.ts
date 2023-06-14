import axios from 'axios';

export const BASE_URL
  = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

// function wait(delay: number) {
//   return new Promise(resolve => {
//     setTimeout(resolve, delay);
//   })
// }

// export function getProducts() {
//   return wait(500)
//     .then(() => fetch(BASE_URL))
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }

//       throw new Error('An error occurred during fetching data');
//     })
//     .catch((error) => {
//       throw new Error('An error occurred during fetching data');
//     });
// }

export const fetcher = (url: string) => axios.get(url).then(res => res.data);
