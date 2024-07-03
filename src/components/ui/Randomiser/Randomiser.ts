export const Randomiser = name => {
  const timestamp = new Date().getTime().toString(36);
  const randomChars = Math.random().toString(36).substring(2, 10);
  const milliseconds = new Date().getMilliseconds();

  return `${timestamp}-${randomChars}-${milliseconds}-${name}`;
};
