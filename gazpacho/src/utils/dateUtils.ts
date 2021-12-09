export function toIsoDate(date: Date) {
  return date.toISOString().split("T")[0];
}
export function toIsoDateWithoutHypens(date: Date) {
  return toIsoDate(date).replace(/-/g, "");
}
