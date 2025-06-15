export const generateAccountNumber = () => {
  const randomDigits = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  return `TW-${randomDigits.slice(0, 4)}-${randomDigits.slice(4)}`;
};
