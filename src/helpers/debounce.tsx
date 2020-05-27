let timer: ReturnType<typeof setTimeout>;

export const debounce = (func:(value:string) => void, value:string, delay: number) => {
  clearTimeout(timer);
  timer = setTimeout(() => func(value), delay)
 }
