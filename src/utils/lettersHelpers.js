//  prettier-ignore
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

export function letterToNumber(letter) {
  const upperLetter = letter.toUpperCase();
  return alphabet.indexOf(upperLetter);
}

export function numberToLetters(num) {
  let s = "",
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = ((num - t) / 26) | 0;
  }
  return s || undefined;
}

export const doesContainLetter = (value) =>
  alphabet.some((letter) => value.includes(letter));

// Gets a cell value (A5+B7 type of equation) and formats it to cell matrix location (0,1)
export function lettersIdToMatrixId(cellValue) {
  const cellIds = cellValue.split(/[+*-/]/);
  const lettersToCellLocation = cellIds.map((cellId) =>
    letterToNumber(cellId[0])
  );
  const cells = [];
  cellIds.forEach((cellId, index) => {
    const finalCellLocation =
      lettersToCellLocation[index].toString() + cellId[1];
    const rowColumnFormat = {
      row: +finalCellLocation[0],
      column: +finalCellLocation[1] - 1,
    };
    cells.push(rowColumnFormat);
  });
  return cells;
}
