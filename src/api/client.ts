export async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(path);

  if (!res.ok) {
    const text = await res.text().catch(() => '');

    throw new Error(
      `Failed to fetch ${path}: ${res.status} ${res.statusText} ${text}`,
    );
  }

  return (await res.json()) as T;
}
