import { useEffect, useRef, useState } from "react";
import CellContext from "../../store/cell-context";
import "./Cell.css";

export const CELL_WIDTH = 100;
export const CELL_HEIGHT = 25;

function Cell(props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [cellValue, setCellValue] = useState("Noa Shay is the queen");
  const inputRef = useRef(null);

  function cellClickHandler() {
    setIsEditMode(true);
  }

  function changeCellToLabel() {
    setIsEditMode(false);
  }

  function onClickOutsideInputHandler(event) {
    if (event.target?.dataset?.cellId !== "2") {
      changeCellToLabel();
    }
  }

  function updateCellValueHandler(event) {
    setCellValue(event.target.value);
  }

  useEffect(() => {
    document.addEventListener("click", onClickOutsideInputHandler);
  });

  const cellContext = {
    cellValue,
  };

  // <CellContext.Provider value={cellContext}>
  return isEditMode ? (
    <input
      ref={inputRef}
      data-cell-id={"2"}
      value={cellValue}
      onChange={updateCellValueHandler}
    ></input>
  ) : (
    <div data-cell-id={"2"} onClick={cellClickHandler}>
      {cellValue}
    </div>
  );
  {
    /* </CellContext.Provider> */
  }
}

export default Cell;
