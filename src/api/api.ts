import phones from './phones.json';
import phoneList from './phoneList.json';

export const getPhones = () => phones;

export const getPhone: any = (id: string) => phoneList.find(phoneItem => phoneItem.id === id);

// 🔥🎃IF WORKING WITH API🎃🔥

// export const PHONES_URL = 'https://mate.academy/students-api/phones';

// export const getPhones = <P>(): Promise<P> => {
//   const response = await fetch(PHONES_URL);
//   const result = await response.json();

//   return result.data;
// };

// export const getPhone = async <P>(id: string): Promise<P> => {
//   const response = await fetch(`${PHONES_URL}/${id}`);
//   const result = await response.json();

//   return result.data;
// };

// 🔥🎃IF WORKING WITH API🎃🔥
