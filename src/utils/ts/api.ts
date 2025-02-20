export const getBannerSlides = () => {
  return fetch('../../api/banner.json').then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};

export const getPhones = () => {
  return fetch('../../api/phones.json').then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
};
