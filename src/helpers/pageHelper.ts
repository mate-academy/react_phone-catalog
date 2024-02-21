export function setScrollState(value: 'hidden' | 'auto') {
  const page = document.documentElement;

  page.style.overflow = value;
}
