export function setHistoryStateItem<T>(key: string, value: T) {
  history.replaceState(
    {
      ...(history.state || {}),
      [key]: value,
    },
    '',
  );
}
