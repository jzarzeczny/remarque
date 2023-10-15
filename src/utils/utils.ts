export function generateRandomId() {
  const timestamp = new Date().getTime().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 5);
  return timestamp + randomNum;
}
