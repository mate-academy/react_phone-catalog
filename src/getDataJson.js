import PropTypes from 'prop-types';

const getDataJson = async(url) => {
  const response = await fetch(url);
  let data = null;

  if (response.ok) {
    data = await response.json();
  } else {
    data = false;
  }

  return data;
};

getDataJson.PropTypes = {
  url: PropTypes.string,
};

export default getDataJson;
