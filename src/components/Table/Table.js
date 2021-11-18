import Row from "../Row/Row";
import Column from "../Column/Column";
import SideCells from "../SideCells/SideCells";
import Cell, { CELL_HEIGHT, CELL_WIDTH } from "../Cell/Cell";
import { useState } from "react";
import { numberToLetters } from "../../utils/numbersToLetters";
import "./Table.css";

function Table(props) {
  const [tableSize, setTableSize] = useState({ width: 1500, heigh: 600 });

  const numberOfColumns = tableSize.width / CELL_WIDTH;
  const numberOfRows = tableSize.heigh / CELL_HEIGHT;

  return (
    <table className={"table"}>
      <tbody>
        <Row>
          {[...Array(numberOfColumns + 1)].map((column, columnIndex) =>
            columnIndex !== 0 ? (
              <SideCells key={columnIndex}>
                {numberToLetters(columnIndex)}
              </SideCells>
            ) : (
              <SideCells key={columnIndex} />
            )
          )}
        </Row>

        {[...Array(numberOfRows)].map((row, rowIndex) => (
          <Row key={rowIndex}>
            <SideCells>{rowIndex + 1}</SideCells>
            {[...Array(numberOfColumns)].map((column, columnIndex) => (
              <Column key={columnIndex}>
                <Cell cellId={`${rowIndex},${columnIndex}`} />
              </Column>
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
