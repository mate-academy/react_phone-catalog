const initialState = {
  addedPhones: [
    {
      age: 0,
      id: 'motorola-xoom-with-wi-fi',
      imageUrl: 'img/phones/motorola-xoom-with-wi-fi.0.jpg',
      name: 'Motorola XOOM™ with Wi-Fi',
    },
    {
      age: 1,
      id: 'motorola-xoom',
      imageUrl: 'img/phones/motorola-xoom.0.jpg',
      name: 'MOTOROLA XOOM™',
    },
    {
      age: 2,
      carrier: 'AT&T',
      id: 'motorola-atrix-4g',
      imageUrl: 'img/phones/motorola-atrix-4g.0.jpg',
      name: 'MOTOROLA ATRIX™ 4G',
    },
  ],
};

export const cartReducer = (state = initialState) => {
  return state;
};
