export function validateDigit3(barcode: string) {
  //boolean
  const digits = barcode.split('').map(Number);

  const checkDigit = Number(digits.pop());

  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    const weight = i % 2 === 0 ? 3 : 1;
    sum += digits[i] * weight;
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  return calculatedCheckDigit === checkDigit;
}

console.log(validateDigit3('7898959891403'));
