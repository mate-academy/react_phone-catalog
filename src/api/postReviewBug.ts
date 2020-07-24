import axios from 'axios';

export const sendToServer = (title: string, screen: string) => {
  axios({
    method: 'post',
    url: 'https://app.fakejson.com/q',
    data: {
      token: 'q_AVF-IbeBSlpdJ_UMVG1g',
      data: {
        title,
        screenCapture: screen,
      },
    },
  });
};
