/* eslint-disable no-restricted-syntax */
export type Param = string | number;

export type Params = {
  [key: string]: Param[] | Param | null;
};

export enum ChangeType {
  COLOR,
  CAPACITY,
}

export function getSearchWith(params: Params,
  search?: string | URLSearchParams) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}

export function getLastWord(path: string) {
  const array = path.split('/');

  return array[array.length - 1];
}

export function prepareLink(path: string,
  changeType: ChangeType,
  value: string) {
  const pathArray = path.split('/');
  const itemIdArray = pathArray[pathArray.length - 1].split('-');

  switch (changeType) {
    case ChangeType.COLOR:
      itemIdArray[itemIdArray.length - 1] = value;
      break;
    case ChangeType.CAPACITY:
      itemIdArray[itemIdArray.length - 2] = value.toLowerCase();
      break;
    default: return path;
  }

  pathArray[pathArray.length - 1] = itemIdArray.join('-');

  return pathArray.join('/');
}
