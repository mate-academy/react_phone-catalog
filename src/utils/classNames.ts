export const getClassNames = (
  element: string,
  modifiers: undefined | string | string[],
  componentStyles: Record<string, string>,
) => {
  if (modifiers === undefined) {
    return '';
  }

  const getClass = (modifier: string) =>
    componentStyles[(element + modifier) as keyof typeof componentStyles] || '';

  if (typeof modifiers === 'string') {
    return getClass(modifiers);
  }

  return modifiers.map(getClass).join(' ');
};
