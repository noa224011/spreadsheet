import "./SideCells.css";

function SideCells(props) {
  return <th className={"side-cell"}>{props.children}</th>;
}

export default SideCells;
