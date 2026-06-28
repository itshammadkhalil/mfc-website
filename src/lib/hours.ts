export function isOpenNow(date: Date = new Date()): boolean {
  const h = date.getHours();
  // Open daily 10:00 AM – 2:00 AM (next day)
  return h >= 10 || h < 2;
}

export const CLOSED_MESSAGE =
  "We're closed right now 😴 Thank you for choosing MFC! Our kitchen is open daily from 10:00 AM to 2:00 AM — come back during these hours and we'd love to serve you. See you soon!";
