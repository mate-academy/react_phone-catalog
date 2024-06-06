interface RequestInitWithCacheBust extends RequestInit {
  cacheBust?: number;
}

export const getData = async <T>(
  url: string,
  options?: RequestInitWithCacheBust,
): Promise<T> => {
  const response = await fetch(url, options);

  if (!response) {
    throw new Error();
  }

  return response.json();
};
