import { lower } from '../shortHands';

export function hasMatches(
  productName: string,
  val: string,
) {
  if (!val) {
    return true;
  }

  // const nameArray = productName.split(' ').filter(x => !!x);
  // const valueArray = val.split(' ').filter(x => !!x);

  // for (let i = 0; i < valueArray.length; i += 1) {
  //   const valueElement = valueArray[i];

  //   for (let j = 0; j < nameArray.length; j += 1) {
  //     if (lower(nameArray[i]).includes(lower(valueElement))) {
  //       return true;
  //     }
  //   }
  // }

  return lower(productName).includes(lower(val));
}
