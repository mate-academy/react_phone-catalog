export function getPages(lastPage: number) {
  const arr = [];

  for (let i = 1; i <= lastPage; i += 1) {
    arr.push(i);
  }

  return arr;
}
