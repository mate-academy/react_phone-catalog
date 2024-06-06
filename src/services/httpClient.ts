interface RequestInitWithCacheBust extends RequestInit {
  cacheBust?: number;
}

export const BASE_URL = `https://alinaovod.github.io/react_phone-catalog/`;

export const getData = async <T>(
  url: string,
  options?: RequestInitWithCacheBust,
): Promise<T> => {
  const response = await fetch(BASE_URL + url, options);

  if (!response) {
    throw new Error();
  }

  return response.json();
};

// export const getData = async <T>(
//   url: string,
//   options?: RequestInitWithCacheBust,
// ): Promise<T> => {
//   const response = await fetch(url, options);

//   if (!response) {
//     throw new Error();
//   }

//   return response.json();
// };
