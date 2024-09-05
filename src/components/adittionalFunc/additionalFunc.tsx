// функція, щоб зробити першу букву слова великою
export function ucFirst(str: string | undefined) {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
}
