export const generateBreadcrumbs = (pathSegments: string[]) => {
  let link = '';

  return pathSegments.map((segment) => {
    link += `/${segment}`;

    return {
      label: segment,
      link,
    };
  });
};
