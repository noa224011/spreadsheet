import { useEffect, useRef, useState } from "react";
import CellContext from "../../store/cell-context";
import "./Cell.css";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

function Cell(props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cellValue, setCellValue] = useState("cell");
  const inputRef = useRef(null);

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
      console.log(props.cellId);
      changeCellToLabel();
    }
  }

  function updateCellValueHandler(event) {
    setCellValue(event.target.value);
  }

  useEffect(() => {
    document.addEventListener("click", onClickOutsideInputHandler);

    return document.addEventListener("click", onClickOutsideInputHandler);
  });

  const cellContext = {
    cellValue,
  };

  return isEditMode ? (
    <CellContext.Provider value={cellContext}>
      <input
        className={"cell-input"}
        ref={inputRef}
        data-cell-id={props.cellId}
        value={cellValue}
        onChange={updateCellValueHandler}
      ></input>
    </CellContext.Provider>
  ) : (
    <CellContext.Provider value={cellContext}>
      <div
        className={"cell-label"}
        data-cell-id={props.cellId}
        onClick={cellClickHandler}
      >
        {cellValue}
      </div>
    </CellContext.Provider>
  );
}

export default Cell;
