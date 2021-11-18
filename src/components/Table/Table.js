import Row from "../Row/Row";
import Column from "../Column/Column";
import Cell, { CELL_HEIGHT, CELL_WIDTH } from "../Cell/Cell";
import { useState } from "react";

function Table(props) {
  const [tableSize, setTableSize] = useState({ width: 600, heigh: 600 });

  const numberOfColumns = tableSize.width / CELL_WIDTH;
  const numberOfRows = tableSize.heigh / CELL_HEIGHT;

  return (
    <table>
      <tbody>
        {[...Array(numberOfRows)].map((row, rowIndex) => (
          <Row key={rowIndex}>
            {[...Array(numberOfColumns)].map((column, columnIndex) => (
              <Column key={columnIndex}>
                <Cell />
              </Column>
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
