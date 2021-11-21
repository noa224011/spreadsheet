import React, { useRef, useState, useImperativeHandle } from "react";
import { evaluate } from "mathjs";
import "./Cell.css";
import { doesContainLetter } from "../../utils/lettersHelpers";

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
      let evalutedExpression;
      if (doesContainLetter(value)) {
        evalutedExpression = lettersEquationBuilder(value);
      } else {
        evalutedExpression = value;
      }
      try {
        return Math.round(evaluate(evalutedExpression));
      } catch {
        return value;
      }
    }
    return value;
  }

  // Gets a cell value, and returns the cell equation translation
  function lettersEquationBuilder(cellValue) {
    const values = props.getCellIdsValues(cellValue);
    const operations = cellValue
      .split(/[A-Z0-9]/)
      .filter((operation) => operation !== "");
    let equation = "";
    for (let i = 0; i < values.length; i++) {
      if (typeof operations[i] === "undefined") {
        equation += `${values[i]}`;
      } else {
        equation += `${values[i]} ${operations[i]} `;
      }
    }
    return equation;
  }

  // When pressing Enter, calculate the result in currect cell
  function onEnterClickCellHandler(event) {
    if (event.key === "Enter") {
      inputRef.current.blur();
    }
  }

  // Upgrade ref content of this component
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
    <input
      className={"cell-input cell-selected"}
      ref={inputRef}
      value={cellValue}
      onChange={onCellValueChange}
      onBlur={onBlur}
      onKeyDown={onEnterClickCellHandler}
    ></input>
  );
});

export default Cell;
