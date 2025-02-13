export function enableScrollRestoration() {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'auto';
  }
}
