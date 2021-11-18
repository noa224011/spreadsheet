import Row from "../Row/Row";
import Column from "../Column/Column";
import Cell, { CELL_HEIGHT, CELL_WIDTH } from "../Cell/Cell";
import { useState } from "react";
import "./Table.css";

function Table(props) {
  const [tableSize, setTableSize] = useState({ width: 1500, heigh: 600 });

  const numberOfColumns = tableSize.width / CELL_WIDTH;
  const numberOfRows = tableSize.heigh / CELL_HEIGHT;

  return (
    <table className={"table"}>
      <tbody>
        {[...Array(numberOfRows)].map((row, rowIndex) => (
          <Row key={rowIndex}>
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
