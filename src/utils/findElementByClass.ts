export const changeElementStyleBackground = (
  className: string,
  value: string,
) => {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    (elements[i] as HTMLElement).style.backgroundColor = value;
  }
};

export const changeElementStyleColor = (className: string, value: string) => {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    (elements[i] as HTMLElement).style.color = value;
  }
};

export const changeElementStyleBorderColor = (
  className: string,
  value: string,
) => {
  const elements = document.getElementsByClassName(className);

  for (let i = 0; i < elements.length; i++) {
    (elements[i] as HTMLElement).style.borderColor = value;
  }
};

export const changePseudoElementStyle = (
  selector: string,
  pseudoElement: '::after' | '::before',
  property: string,
  value: string,
) => {
  // Create a unique class name for the style
  const styleId = `pseudo-style-${selector.replace(/\s+/g, '-')}`;

  // Check if the style element already exists
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  if (!styleElement) {
    // Create a new style element
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  // Update the style element content
  styleElement.textContent = `
    ${selector}${pseudoElement} {
      ${property}: ${value};
    }
  `;
};

export const changeElementStyle = (
  selector: string,
  property: string,
  value: string,
) => {
  // Create a unique class name for the style
  const styleId = `pseudo-style-${selector.replace(/\s+/g, '-')}`;

  // Check if the style element already exists
  let styleElement = document.getElementById(styleId) as HTMLStyleElement;

  if (!styleElement) {
    // Create a new style element
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  // Update the style element content
  styleElement.textContent = `
    ${selector} {
      ${property}: ${value};
    }
  `;
};
