export default function generateGuid(): string {
  const array = new Uint32Array(1);
  return crypto.getRandomValues(array)[0].toString();
}
