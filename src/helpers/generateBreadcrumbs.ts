export const generateBreadcrumbs = (pathSegments: string[]) => {
  let link = '';

  return pathSegments.map((segment) => {
    link += `/${segment}`;

    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      link,
    };
  });
};
