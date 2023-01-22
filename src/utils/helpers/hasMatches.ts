import { lower } from '../shortHands';

export function hasMatches(
  productName: string,
  val: string,
) {
  if (!val) {
    return true;
  }

  const valArray = val.split(' ').filter(x => !!x);

  for (let i = 0; i < valArray.length; i += 1) {
    const valElement = valArray[i];

    if (!lower(productName).includes(lower(valElement))) {
      return false;
    }
  }

  return true;
}
