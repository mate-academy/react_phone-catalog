export const makeCLassWithIteration = (
  className: string,
  iteration: number,
) => {
  switch (true) {
    case iteration % 2 === 0: {
      return `${className} ${className}--2`;
    }

    case iteration % 3 === 0: {
      return `${className} ${className}--3`;
    }

    default: {
      return `${className} ${className}--1`;
    }
  }
};
