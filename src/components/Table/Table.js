import Row from "../Row/Row";
import Column from "../Column/Column";
import SideCells from "../SideCells/SideCells";
import { CELL_HEIGHT, CELL_WIDTH } from "../Cell/Cell";
import Cell from "../Cell/Cell";
import { useEffect, useRef, useState } from "react";
import {
  lettersIdToMatrixId,
  numberToLetters,
} from "../../utils/lettersHelpers";
import "./Table.css";

function Table(props) {
  const [tableSize, setTableSize] = useState({ width: 1500, heigh: 500 });
  const cellsRefs = useRef([]);
  const [isInit, setIsInit] = useState(false);

  const numberOfColumns = tableSize.width / CELL_WIDTH;
  const numberOfRows = tableSize.heigh / CELL_HEIGHT;

  // function focuseNextCell(cellId) {
  //   const [row, column] = cellId.split(",").map((el) => +el);
  //   // TODO: the order is not correct!
  //   console.log("row, column:", row, column);
  //   cellsRefs.current[row + 1][column].focus();
  // }

  // Get cell value at specified location in the matrix
  function getCellValue(row, column) {
    return cellsRefs?.current[row][column].cellValue;
  }

  // Gets a cell value (A5+B7 type of equation), and returns each cell location value
  function getCellIdsValues(cellValue) {
    const cells = lettersIdToMatrixId(cellValue); // [ {row: '0', column: '0'} ]
    const values = [];
    cells.forEach((cell) => {
      const { row, column } = cell;
      if (getCellValue(+row, +column) === "") {
        values.push("0");
      } else {
        values.push(getCellValue(+row, +column));
      }
    });
    return values;
  }

  // Initialize cells matrix
  useEffect(() => {
    if (isInit) return;

    for (let i = 0; i < numberOfRows; i++) {
      cellsRefs.current.push([...Array(numberOfColumns)]);
    }
    setIsInit(true);
  }, [isInit]);

  // useEffect(() => {
  //   if (isInit) {
  //     localStorage.setItem("matrix", JSON.stringify(cellsRefs));
  //     console.log("local storage is updated");
  //   }
  // }, [cellsRefs]);

  return (
    <table className={"table"}>
      <tbody>
        <Row>
          {cellsRefs.current?.[0]?.map((column, columnIndex) => (
            <SideCells key={columnIndex}>
              {numberToLetters(columnIndex)}
            </SideCells>
          ))}
          <SideCells>{numberToLetters(numberOfColumns)}</SideCells>
        </Row>

        {cellsRefs.current.map((row, rowIndex) => (
          <Row key={rowIndex}>
            <SideCells>{rowIndex + 1}</SideCells>
            {row.map((column, columnIndex) => (
              <Column key={columnIndex}>
                <Cell
                  ref={(ref) => {
                    cellsRefs.current[columnIndex][rowIndex] = ref;
                  }}
                  cellId={`${rowIndex},${columnIndex}`}
                  getCellIdsValues={getCellIdsValues}
                />
              </Column>
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
