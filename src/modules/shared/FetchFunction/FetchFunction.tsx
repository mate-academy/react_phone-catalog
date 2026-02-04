export async function fetchUrl(url: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

  return response.json();
}
