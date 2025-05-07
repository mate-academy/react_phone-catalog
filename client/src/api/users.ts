import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
});

interface User {
  email: string;
  password: string;
}

export const create = (body: User) => {
  return instance.post('users', body, { withCredentials: true });
};
