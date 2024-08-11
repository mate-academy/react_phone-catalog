export const getFragment = <T>(take: number, middleIndex: number, arr: T[]) => {
  if (arr.length < take) {
    return arr;
  }

  let expectedNumsOnRight = Math.ceil((take - 1) / 2);
  let expectedNumsOnLeft = take - 1 - expectedNumsOnRight;

  if (expectedNumsOnRight + (middleIndex + 1) > arr.length) {
    const shift = expectedNumsOnRight + (middleIndex + 1) - arr.length;

    expectedNumsOnRight -= shift;
    expectedNumsOnLeft += shift;
  } else if (middleIndex - expectedNumsOnLeft < 0) {
    const shift = expectedNumsOnLeft - middleIndex;

    expectedNumsOnLeft -= shift;
    expectedNumsOnRight += shift;
  }

  return arr.slice(
    middleIndex - expectedNumsOnLeft,
    middleIndex + expectedNumsOnRight + 1,
  );
};
