const getData = async(type = '') => {
  const baseUrl = `https://mate-academy.github.io`;
  const phoneUrl = `/phone-catalogue-static/api/phones`;

  return fetch(`${baseUrl}${phoneUrl}${type}.json`)
    .then(response => response.json());
};

export default getData;
