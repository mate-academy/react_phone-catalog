/* eslint-disable */
const GetData = url => (
  fetch(url)
    .then(responce => responce.json())
);

export default GetData;
