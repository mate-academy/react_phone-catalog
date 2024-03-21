/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
export function getEnumKeyByEnumValue<
  T extends { [index: string]: string | number },
>(myEnum: T, enumValue: string | number): keyof T | null {
  const keys = Object.keys(myEnum).filter(x => {
    if (typeof myEnum[x] === 'number') {
      return myEnum[x] === Number(enumValue);
    }

    return myEnum[x] === String(enumValue);
  });

  return keys.length > 0 ? keys[0] : null;
}

export function getEnumValueByKey<T extends { [index: string]: string }>(
  myEnum: T,
  enumKey: string,
): keyof T | null {
  const indexOfKey = Object.keys(myEnum).indexOf(enumKey);

  return Object.values(myEnum)[indexOfKey];
}

export function enumToArrayOfObjects<
  T extends { [index: string]: string | number },
>(myEnum: T) {
  const keysValues = Object.keys(myEnum)
    .filter(key => Number.isNaN(Number(key)))
    .map(key => {
      return {
        value: key,
        text: myEnum[key as keyof typeof myEnum],
      };
    });

  return keysValues;
}

export function sortNumericField(
  val1: number | string,
  val2: number | string,
  type: 'ASC' | 'DESC',
) {
  const value1 = val1.toString();
  const value2 = val2.toString();

  if (type === 'ASC') {
    return parseFloat(value1) - parseFloat(value2);
  }

  return parseFloat(value2) - parseFloat(value1);
}

export function addPropToItemsComparedAnotherItems<T, K extends keyof T>(
  originalItems: T[],
  itemsToCompare: T[],
  propGeneralToCompare: K,
  propToAdd: string,
) {
  const propGeneralList = itemsToCompare.map(
    item => item[propGeneralToCompare],
  );

  const modifiedOriginalItems = [...originalItems].map(item => {
    if (propGeneralList.includes(item[propGeneralToCompare])) {
      return {
        ...item,
        [propToAdd]: true,
      };
    }

    return item;
  });

  return modifiedOriginalItems;
}

export function deleteItemFromArrayByField<T, K extends keyof T>(
  item: T,
  items: T[],
  field: K,
): T[] {
  return [...items].filter(itm => itm[field] !== item[field]);
}

export function addItemFromArrayByField<T>(item: T, items: T[]): T[] {
  const modifiedItems = [...items, item];

  return modifiedItems;
}

export function addDeleteExistItemFromArray<T, K extends keyof T>(
  newItem: T,
  items: T[],
  keyCompare: K,
) {
  const isItemExists =
    items.findIndex(item => item[keyCompare] === newItem[keyCompare]) !== -1;

  if (!isItemExists) {
    return [...items, newItem];
  }

  return [...items].filter(item => item[keyCompare] !== newItem[keyCompare]);
}

export function isItemInArray<T, K extends keyof T>(
  searchItem: T,
  items: T[],
  keyCompare: K,
) {
  return (
    items.findIndex(item => item[keyCompare] === searchItem[keyCompare]) !== -1
  );
}

export function capitalize(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function getRandomKey(): string {
  return Math.random().toString(36).slice(2, 8);
}
