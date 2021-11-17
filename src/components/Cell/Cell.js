import { useEffect, useRef, useState } from "react";
import "./Cell.css";

function Cell(props) {
  const [isEditMode, setIsEditMode] = useState(false);
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

  useEffect(() => {
    document.addEventListener("click", onClickOutsideInputHandler);
  });

  return isEditMode ? (
    <input ref={inputRef} data-cell-id={"2"}></input>
  ) : (
    <div data-cell-id={"2"} onClick={cellClickHandler}>
      {props.children}
    </div>
  );
}

export default Cell;
