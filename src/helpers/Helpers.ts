export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getSelectedOptionText = (currentOption: string) => {
  if (currentOption === "age") {
    return "Newest";
  }

  if (currentOption === "name") {
    return "Alphabetically";
  }

  return "Cheapest";
};
