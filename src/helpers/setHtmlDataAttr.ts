import { HTMLDataAttr } from '../enums/htmlDataAttribs';

/**
 * Sets or removes a data-* attribute on a specific element (either <html> or <body>).
 * @param element - 'html' or 'body' to target which element to apply the data-* attribute
 * @param attr - Enum key from HTMLDataAttr
 * @param value - If null/undefined, removes the attribute. Otherwise sets it.
 */
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
