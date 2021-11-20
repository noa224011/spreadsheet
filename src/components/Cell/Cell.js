import React, { useRef, useState, useImperativeHandle } from "react";
import { evaluate } from "mathjs";
import "./Cell.css";
import CellContext from "../../store/cell-context";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

const Cell = React.forwardRef((props, ref) => {
  const [cellValue, setCellValue] = useState("");
  const inputRef = useRef(null);

  // Set cell value state each time the user enters input
  function onCellValueChange(event) {
    setCellValue(event.target.value);
  }

  // When clicking on another cell, calculate the result in currect cell
  function onBlur() {
    if (cellValue) {
      const outcome = calculate(cellValue);
      setCellValue(outcome);
    }
  }

  // Calculate value each time it starts with '='
  function calculate(value) {
    if (value && value.startsWith("=")) {
      const value = cellValue.slice(1);
      try {
        return Math.round(evaluate(value));
      } catch {}
    }
    return value;
  }

  // When pressing Enter, calculate the result in currect cell
  function onEnterClickCellHandler(event) {
    if (event.key === "Enter") {
      inputRef.current.blur();
      props.onEnterPressed(props.cellId);
      props.getCellIdsValues(cellValue);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        inputRef.current.focus();
      },
      cellValue: cellValue,
    }),
    [cellValue]
  );

  return (
    <CellContext.Provider value={{ cellValue: cellValue }}>
      <input
        className={"cell-input cell-selected"}
        ref={inputRef}
        value={cellValue}
        onChange={onCellValueChange}
        onBlur={onBlur}
        onKeyDown={onEnterClickCellHandler}
      ></input>
    </CellContext.Provider>
  );
});

export default Cell;
