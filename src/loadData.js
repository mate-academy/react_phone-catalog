export const loadPosts = async() => {
  let loadedData = await fetch('https://bloggy-api.herokuapp.com/posts');

  loadedData = await loadedData.json();

  return loadedData;
};

export const loadComments = async() => {
  let loadedData = await fetch('https://bloggy-api.herokuapp.com/comments');

  loadedData = await loadedData.json();

  return loadedData;
};
