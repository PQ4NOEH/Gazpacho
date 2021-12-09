export function generateHashCode(str: string): number {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const RANDOM_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export function randomString(length: number = 10): string {
  let result = "";
  const charactersLength = RANDOM_CHARACTERS.length;
  for (var i = 0; i < length; i++) {
    result += RANDOM_CHARACTERS.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return result;
}
