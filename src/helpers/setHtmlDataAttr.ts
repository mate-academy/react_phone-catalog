import { HTMLDataAttr } from '../enums/htmlDataAttribs';

export function setElementDataAttr(
  element: 'html' | 'body',
  attr: HTMLDataAttr,
  value?: string | boolean,
) {
  const targetElement =
    element === 'html' ? document.documentElement : document.body;

  const key = `data-${attr}`;

  if (value === null || value === undefined || value === false) {
    targetElement.removeAttribute(key);
  } else {
    targetElement.setAttribute(key, String(value));
  }
}
