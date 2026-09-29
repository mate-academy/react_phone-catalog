type ClassValue = string | undefined | null | false | Record<string, boolean>;

export default function classNames(...values: ClassValue[]): string {
  const classes: string[] = [];

  values.forEach(value => {
    if (!value) {
      return;
    }

    if (typeof value === 'string') {
      classes.push(value);

      return;
    }

    Object.entries(value).forEach(([key, condition]) => {
      if (condition) {
        classes.push(key);
      }
    });
  });

  return classes.join(' ');
}
