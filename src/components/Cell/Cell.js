import { useEffect, useRef, useState } from "react";
import CellContext from "../../store/cell-context";
import "./Cell.css";
import { evaluate } from "mathjs";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

function Cell(props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cellValue, setCellValue] = useState("");
  const inputRef = useRef();

  function cellClickHandler() {
    console.log("EDIT MODE ON");
    setIsEditMode(true);
  }

  function changeCellToLabel() {
    console.log("EDIT MODE OFF");
    setIsEditMode(false);
  }

  function onClickOutsideInputHandler(event) {
    if (event.target.dataset.cellId !== props.cellId) {
      if (cellValue) {
        console.log("is this happening?");
        const outcome = calculate(cellValue);
        setCellValue(outcome);
        return;
      }
      changeCellToLabel();
    }
  }

  function updateCellValueHandler(event) {
    setCellValue(event.target.value);
    console.log(`cellId: ${props.cellId}`);
    console.log("ref:", inputRef.current?.value);
    console.log("cellValue", cellValue);
  }

  function calculate(value) {
    if (value.startsWith("=")) {
      const value = cellValue.slice(1);
      try {
        return evaluate(value);
      } catch {
        return value;
      }
    } else {
      return value;
    }
  }

  // function handleClickOutsideCell(event) {
  //   if (inputRef.current && !inputRef.current.contains(event.target)) {
  //     console.log("input ref:", inputRef.current);
  //     console.log("event target:", event.target);
  //     console.log("You clicked outside of me!");
  //     console.log("cell value:", cellValue);

  //     // TODO: Add calculation here
  //     if (cellValue) {
  //       console.log("is this happening?");
  //       const outcome = calculate(cellValue);
  //       setCellValue(outcome);
  //       return;
  //     }
  //   }
  // }

  useEffect(() => {
    document.addEventListener("click", onClickOutsideInputHandler);
    return () => {
      document.removeEventListener("click", onClickOutsideInputHandler);
    };
  }, [inputRef]);

  function onEnterClickCellHandler(event) {
    if (event.key === "Enter") {
      setIsEditMode(false);
      if (cellValue) {
        const outcome = Math.round(calculate(cellValue));
        setCellValue(outcome);
      }
    }
  }

  // const cellContext = {
  //   cellValue,
  // };

  const inputClassName = isEditMode ? "cell-input cell-selected" : "cell-input";

  return isEditMode ? (
    // <CellContext.Provider value={cellContext}>
    <input
      className={inputClassName}
      ref={inputRef}
      data-cell-id={props.cellId}
      value={cellValue}
      onChange={updateCellValueHandler}
      onKeyDown={onEnterClickCellHandler}
    ></input>
  ) : (
    // <CellContext.Provider value={cellContext}>
    <div
      className={"cell-label"}
      data-cell-id={props.cellId}
      onClick={cellClickHandler}
    >
      {cellValue}
    </div>
  );
}

export default Cell;
