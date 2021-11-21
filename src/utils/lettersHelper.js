//  prettier-ignore
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export function letterToNumber(letter) {
  const upperLetter = letter.toUpperCase();
  return alphabet.indexOf(upperLetter);
}

export const doesContainLetter = (value) =>
  alphabet.some((letter) => value.includes(letter));
