export function getRootCssVariable(varName: string) {
  const rootStyles = getComputedStyle(document.documentElement)
  return rootStyles.getPropertyValue(varName);
}