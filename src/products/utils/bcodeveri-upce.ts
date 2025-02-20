export function validateUPCEorEAN8(barcode: string) {
  //boolean
  const digits = barcode.split('').map(Number);

  const checkDigit = Number(digits.pop());

  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    const weight = i % 2 === 0 ? 1 : 3;
    sum += digits[i] * weight;
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  if (calculatedCheckDigit === checkDigit) {
    return calculatedCheckDigit === checkDigit;
  } else {
    sum = 0;

    for (let i = 0; i < digits.length; i++) {
      const weight = i % 2 === 0 ? 3 : 1;
      sum += digits[i] * weight;
    }

    const calculatedCheckDigit2 = (10 - (sum % 10)) % 10;

    return calculatedCheckDigit2 === checkDigit;
  }
}

console.log(validateUPCEorEAN8('12345670'));
