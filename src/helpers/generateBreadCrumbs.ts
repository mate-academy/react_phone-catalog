export const getBreadCrumbs = (path: string[]) => {
  let link = '';

  return path.map((category) => {
    link += `/${category}`;

    return {
      label: category.charAt(0).toUpperCase() + category.slice(1),
      link,
    };
  });
};
